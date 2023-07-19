import { AuthOptions } from "next-auth"

export { BaseNFTStrategy } from "./BaseNFTStrategy"
export { PromoNFTStrategy } from "./PromoNFTStrategy"

export type IProcessArgs = { [key: string]: string | string[] }

/**
 * Контекст определяет интерфейс, представляющий интерес для клиентов.
 */
export class SignInProcessesContext {
  /**
   * @type {Strategy} Контекст хранит ссылку на один из объектов Стратегии.
   * Контекст не знает конкретного класса стратегии. Он должен работать со
   * всеми стратегиями через интерфейс Стратегии.
   */
  private _strategy: SignInProcessStrategy

  /**
   * Обычно Контекст принимает стратегию через конструктор, а также
   * предоставляет сеттер для её изменения во время выполнения.
   */
  constructor(strategy: SignInProcessStrategy) {
    this._strategy = strategy
  }

  /**
   * Обычно Контекст позволяет заменить объект Стратегии во время выполнения.
   */
  public setStrategy(strategy: SignInProcessStrategy) {
    this._strategy = strategy
  }

  /**
   * Вместо того, чтобы самостоятельно реализовывать множественные версии
   * алгоритма, Контекст делегирует некоторую работу объекту Стратегии.
   */
  public process(data: IProcessArgs) {
    return this._strategy.holdAuth(data)
  }
}

/**
 * Интерфейс Стратегии объявляет операции, общие для всех поддерживаемых версий
 * некоторого алгоритма.
 *
 * Контекст использует этот интерфейс для вызова алгоритма, определённого
 * Конкретными Стратегиями.
 */
export interface SignInProcessStrategy {
  holdAuth(data: IProcessArgs): Pick<AuthOptions, "events" | "callbacks">
}
