import * as fcl from "@onflow/fcl";
import { ICollectionsData } from "./types";
import { script } from "./cdcScript";

export class FlowCollections {
  public flow: any;
  public script: string;

  constructor(fcl: any, script: string) {
    this.flow = fcl;
    this.script = script;
  }

  async getTokensByIds(
    address: string,
    collections: string,
    ids: string[]
  ): Promise<ICollectionsData> {
    const result = await fcl.query({
      cadence: this.script,
      args: (arg, t) => [
        arg(address, t.Address),
        arg([collections], t.Array(t.String)),
        arg(ids, t.Array(t.UInt64)),
      ],
    });
    return result;
  }

  async getCollectionsData(
    address: string,
    collections: string[]
  ): Promise<ICollectionsData> {
    if (!address || !collections.length) return {}
    const result: ICollectionsData = await fcl.query({
      cadence: this.script,
      args: (arg, t) => [
        arg(address, t.Address),
        arg(collections, t.Array(t.String)),
        arg([], t.Array(t.UInt64)),
      ],
    });
    for (const collection of Object.keys(result)) {
      while (result[collection].remained) {
        const remainedData = (
          await this.getTokensByIds(
            address,
            collection,
            result[collection].remained
          )
        )[collection];
        result[collection].items = [
          ...result[collection].items,
          ...remainedData.items,
        ];
        result[collection].remained = remainedData.remained;
      }
    }

    return result;
  }

  static create() {    
    return new FlowCollections(fcl, script);
  }
}
