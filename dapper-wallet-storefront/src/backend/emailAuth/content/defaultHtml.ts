import { Theme } from "next-auth"

export type IHTMLAnswerParams = { url: string; host: string; theme: Theme }

/**
 * Email HTML body
 * Insert invisible space into domains from being turned into a hyperlink by email
 * clients like Outlook and Apple mail, as this is confusing because it seems
 * like they are supposed to click on it to sign in.
 *
 * @note We don't add the email address to avoid needing to escape it, if you do, remember to sanitize it!
 */
export function defaultHTML(params: IHTMLAnswerParams) {
  const { url, host, theme } = params
  const escapedHost = host.replace(/\./g, "&#8203;.")

  const brandColor = theme.brandColor || "#346df1"
  const color = {
    background: "#f9f9f9",
    text: "#444",
    mainBackground: "#fff",
    buttonBackground: brandColor,
    buttonBorder: brandColor,
    buttonText: theme.buttonText || "#fff",
  }

  return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
  <!--[if gte mso 9]>
  <xml>
    <o:OfficeDocumentSettings>
      <o:AllowPNG/>
      <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
  </xml>
  <![endif]-->
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="x-apple-disable-message-reformatting">
    <!--[if !mso]><!--><meta http-equiv="X-UA-Compatible" content="IE=edge"><!--<![endif]-->
    <title></title>
    
      <style type="text/css">
        @media only screen and (min-width: 720px) {
    .u-row {
      width: 700px !important;
    }
    .u-row .u-col {
      vertical-align: top;
    }
  
    .u-row .u-col-50 {
      width: 350px !important;
    }
  
    .u-row .u-col-100 {
      width: 700px !important;
    }
  
  }
  
  @media (max-width: 720px) {
    .u-row-container {
      max-width: 100% !important;
      padding-left: 0px !important;
      padding-right: 0px !important;
    }
    .u-row .u-col {
      min-width: 320px !important;
      max-width: 100% !important;
      display: block !important;
    }
    .u-row {
      width: 100% !important;
    }
    .u-col {
      width: 100% !important;
    }
    .u-col > div {
      margin: 0 auto;
    }
  }
  body {
    margin: 0;
    padding: 0;
  }
  
  table,
  tr,
  td {
    vertical-align: top;
    border-collapse: collapse;
  }
  
  p {
    margin: 0;
  }
  
  .ie-container table,
  .mso-container table {
    table-layout: fixed;
  }
  
  * {
    line-height: inherit;
  }
  
  a[x-apple-data-detectors='true'] {
    color: inherit !important;
    text-decoration: none !important;
  }
  
  @media (max-width: 480px) {
    .hide-mobile {
      max-height: 0px;
      overflow: hidden;
      display: none !important;
    }
  }
  
  table, td { color: #ffffff; } #u_body a { color: #0071e3; text-decoration: underline; } #u_content_text_17 a { color: #eccafa; text-decoration: none; } @media (max-width: 480px) { #u_content_image_1 .v-src-width { width: auto !important; } #u_content_image_1 .v-src-max-width { max-width: 50% !important; } #u_row_10.v-row-padding--vertical { padding-top: 4px !important; padding-bottom: 10px !important; } #u_content_button_4 .v-padding { padding: 10px 20px !important; } #u_content_menu_1 .v-layout-display { display: block !important; } #u_content_text_17 .v-text-align { text-align: center !important; } #u_content_menu_2 .v-layout-display { display: block !important; } }
      </style>
    
    
  
  <!--[if !mso]><!--><link href="https://fonts.googleapis.com/css?family=Rubik:400,700" rel="stylesheet" type="text/css"><!--<![endif]-->
  
  </head>
  
  <body class="clean-body u_body" style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #000000;color: #ffffff">
    <!--[if IE]><div class="ie-container"><![endif]-->
    <!--[if mso]><div class="mso-container"><![endif]-->
    <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #000000;width:100%" cellpadding="0" cellspacing="0">
    <tbody>
    <tr style="vertical-align: top">
      <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #000000;"><![endif]-->
      
  
  <div class="u-row-container v-row-padding--vertical" style="padding: 0px;background-color: #ffffff">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="700" style="background-color: #ffffff;width: 700px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 700px;display: table-cell;vertical-align: top;">
    <div style="background-color: #ffffff;height: 100%;width: 100% !important;">
    <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;"><!--<![endif]-->
    
  <table id="u_content_image_1" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px 10px 0px;font-family:helvetica,sans-serif;" align="left">
          
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
        <a href="https://gamisodes.com/" target="_blank">
        <img align="center" border="0" src="https://collect.gamisodes.com/_next/image?url=%2FGamisodes_footer.png&w=256&q=75" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 30%;max-width: 204px;" width="204" class="v-src-width v-src-max-width"/>
        </a>
      </td>
    </tr>
  </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div id="u_row_10" class="u-row-container v-row-padding--vertical" style="padding: 4px 0px 0px;background-color: #ffffff">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 4px 0px 0px;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="350" style="background-color: #ffffff;width: 350px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-50" style="max-width: 320px;min-width: 350px;display: table-cell;vertical-align: top;">
    <div style="background-color: #ffffff;height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
          
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td class="v-text-align" style="padding-right: 0px;padding-left: 0px;" align="center">
        
        <img align="center" border="0" src="https://gamisodes.com/cdn/shop/files/Inspector-Gadget_VIP-Genesis-Cards.png?v=1676090998&width=1100" alt="" title="" style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 330px;" width="330" class="v-src-width v-src-max-width"/>
        
      </td>
    </tr>
  </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
  <!--[if (mso)|(IE)]><td align="center" width="350" style="width: 350px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-50" style="max-width: 320px;min-width: 350px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
          
    <h1 class="v-text-align" style="margin: 0px; color: #9500ca; line-height: 140%; text-align: left; word-wrap: break-word; font-family: 'Rubik',sans-serif; font-size: 22px; font-weight: 700;">Sign in to <strong>${escapedHost}</strong>
    </h1>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
          
    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #BBBBBB;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <span>&#160;</span>
          </td>
        </tr>
      </tbody>
    </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table id="u_content_button_4" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
          
    <!--[if mso]><style>.v-button {background: transparent !important;}</style><![endif]-->
  <div class="v-text-align" align="left">
    <!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${url}" style="height:37px; v-text-anchor:middle; width:92px;" arcsize="11%"  stroke="f" fillcolor="#9500ca"><w:anchorlock/><center style="color:#FFFFFF;font-family:helvetica,sans-serif;"><![endif]-->  
      <a href="${url}" target="_blank" class="v-button" style="box-sizing: border-box;display: inline-block;font-family:helvetica,sans-serif;text-decoration: none;-webkit-text-size-adjust: none;text-align: center;color: #FFFFFF; background-color: #9500ca; border-radius: 4px;-webkit-border-radius: 4px; -moz-border-radius: 4px; width:auto; max-width:100%; overflow-wrap: break-word; word-break: break-word; word-wrap:break-word; mso-border-alt: none;font-family: 'Rubik',sans-serif; font-size: 14px;font-weight: 700; ">
        <span class="v-padding" style="display:block;padding:10px 20px;line-height:120%;"><span style="line-height: 16.8px;">SIGN IN</span></span>
      </a>
    <!--[if mso]></center></v:roundrect><![endif]-->
  </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
          
    <div class="v-text-align" style="font-family: 'Rubik',sans-serif; font-size: 12px; color: #9500ca; line-height: 140%; text-align: left; word-wrap: break-word;">
      <p style="line-height: 140%;">If you did not request this email you can safely ignore it</p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
  
  <div class="u-row-container v-row-padding--vertical" style="padding: 10px 10px 50px;background-image: url('https://gamisodes.com/cdn/shop/files/BG_Genesis_VIP_3.jpg');background-repeat: no-repeat;background-position: center center;background-color: #ffffff">
    <div class="u-row" style="Margin: 0 auto;min-width: 320px;max-width: 700px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
      <div style="border-collapse: collapse;display: table;width: 100%;height: 100%;background-color: transparent;">
        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 10px 10px 50px;background-image: url('https://gamisodes.com/cdn/shop/files/BG_Genesis_VIP_3.jpg');background-repeat: no-repeat;background-position: center center;background-color: #ffffff;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:700px;"><tr style="background-color: transparent;"><![endif]-->
        
  <!--[if (mso)|(IE)]><td align="center" width="700" style="width: 700px;padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
  <div class="u-col u-col-100" style="max-width: 320px;min-width: 700px;display: table-cell;vertical-align: top;">
    <div style="height: 100%;width: 100% !important;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;">
    <!--[if (!mso)&(!IE)]><!--><div style="box-sizing: border-box; height: 100%; padding: 0px 30px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;"><!--<![endif]-->
    
  <table id="u_content_menu_1" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:helvetica,sans-serif;" align="left">
          
  <div class="menu" style="text-align:center">
  <!--[if (mso)|(IE)]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center"><tr><![endif]-->
  
    <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
    
      <a href="https://gamisodes.com/" target="_blank" style="padding:5px 10px;display:inline-block;color:#d2d2d7;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 700;text-decoration:none"  class="v-padding v-layout-display">
        Shop Online
      </a>
    
    <!--[if (mso)|(IE)]></td><![endif]-->
    
      <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
      <span style="padding:5px 10px;display:inline-block;color:#424245;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 700;" class="v-padding hide-mobile">
        |
      </span>
      <!--[if (mso)|(IE)]></td><![endif]-->
    
  
    <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
    
      <a href="https://gamisodes.com/pages/collections" target="_blank" style="padding:5px 10px;display:inline-block;color:#d2d2d7;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 700;text-decoration:none"  class="v-padding v-layout-display">
        Collections
      </a>
    
    <!--[if (mso)|(IE)]></td><![endif]-->
    
      <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
      <span style="padding:5px 10px;display:inline-block;color:#424245;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 700;" class="v-padding hide-mobile">
        |
      </span>
      <!--[if (mso)|(IE)]></td><![endif]-->
    
  
    <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
    
      <a href="https://gamisodes.com/pages/team-1" target="_blank" style="padding:5px 10px;display:inline-block;color:#d2d2d7;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 700;text-decoration:none"  class="v-padding v-layout-display">
        Our Team
      </a>
    
    <!--[if (mso)|(IE)]></td><![endif]-->
    
      <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
      <span style="padding:5px 10px;display:inline-block;color:#424245;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 700;" class="v-padding hide-mobile">
        |
      </span>
      <!--[if (mso)|(IE)]></td><![endif]-->
    
  
    <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
    
      <a href="https://gamisodes.com/blogs/news" target="_blank" style="padding:5px 10px;display:inline-block;color:#d2d2d7;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 700;text-decoration:none"  class="v-padding v-layout-display">
        Blog
      </a>
    
    <!--[if (mso)|(IE)]></td><![endif]-->
    
  
  <!--[if (mso)|(IE)]></tr></table><![endif]-->
  </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
          
    <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #424245;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
      <tbody>
        <tr style="vertical-align: top">
          <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
            <span>&#160;</span>
          </td>
        </tr>
      </tbody>
    </table>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table id="u_content_text_17" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:helvetica,sans-serif;" align="left">
          
    <div class="v-text-align" style="font-family: 'Rubik',sans-serif; font-size: 13px; color: #ffffff; line-height: 200%; text-align: left; word-wrap: break-word;">
      <p style="line-height: 200%;">The <a rel="noopener" href="https://gamisodes.com/" target="_blank">gamisodes.com</a> website is owned and operated by Kids Media Inc. dba Gamisodes.  Please read these <a rel="noopener" href="https://gamisodes.com/pages/terms" target="_blank">Terms of Service</a> carefully before using this website, mobile applications, social media accounts, Gamisodes Shopify storefront, and any related platform and services offered by Gamisodes. </p>
    </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
  <table id="u_content_menu_2" style="font-family:helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
    <tbody>
      <tr>
        <td style="overflow-wrap:break-word;word-break:break-word;padding:5px;font-family:helvetica,sans-serif;" align="left">
          
  <div class="menu" style="text-align:center">
  <!--[if (mso)|(IE)]><table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center"><tr><![endif]-->
  
    <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
    
      <a href="https://www.facebook.com/profile.php?id=100073143924225" target="_blank" style="padding:5px 10px;display:inline-block;color:#ffffff;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 400;text-decoration:none"  class="v-padding v-layout-display">
        Facebook
      </a>
    
    <!--[if (mso)|(IE)]></td><![endif]-->
    
      <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
      <span style="padding:5px 10px;display:inline-block;color:#a9a9aa;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 400;" class="v-padding hide-mobile">
        |
      </span>
      <!--[if (mso)|(IE)]></td><![endif]-->
    
  
    <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
    
      <a href="https://www.instagram.com/gamisodes/" target="_blank" style="padding:5px 10px;display:inline-block;color:#ffffff;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 400;text-decoration:none"  class="v-padding v-layout-display">
        Instagram
      </a>
    
    <!--[if (mso)|(IE)]></td><![endif]-->
    
      <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
      <span style="padding:5px 10px;display:inline-block;color:#a9a9aa;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 400;" class="v-padding hide-mobile">
        |
      </span>
      <!--[if (mso)|(IE)]></td><![endif]-->
    
  
    <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
    
      <a href="https://twitter.com/PlayGamisodes" target="_blank" style="padding:5px 10px;display:inline-block;color:#ffffff;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 400;text-decoration:none"  class="v-padding v-layout-display">
        Twitter
      </a>
    
    <!--[if (mso)|(IE)]></td><![endif]-->
    
      <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
      <span style="padding:5px 10px;display:inline-block;color:#a9a9aa;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 400;" class="v-padding hide-mobile">
        |
      </span>
      <!--[if (mso)|(IE)]></td><![endif]-->
    
  
    <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
    
      <a href="https://www.youtube.com/@gamisodes4619" target="_blank" style="padding:5px 10px;display:inline-block;color:#ffffff;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 400;text-decoration:none"  class="v-padding v-layout-display">
        YouTube
      </a>
    
    <!--[if (mso)|(IE)]></td><![endif]-->
    
      <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
      <span style="padding:5px 10px;display:inline-block;color:#a9a9aa;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 400;" class="v-padding hide-mobile">
        |
      </span>
      <!--[if (mso)|(IE)]></td><![endif]-->
    
  
    <!--[if (mso)|(IE)]><td style="padding:5px 10px"><![endif]-->
    
      <a href="https://discord.com/invite/ZB4Mubkwrf" target="_blank" style="padding:5px 10px;display:inline-block;color:#ffffff;font-family:'Rubik',sans-serif;font-size:15px;font-weight: 400;text-decoration:none"  class="v-padding v-layout-display">
        Discord
      </a>
    
    <!--[if (mso)|(IE)]></td><![endif]-->
    
  
  <!--[if (mso)|(IE)]></tr></table><![endif]-->
  </div>
  
        </td>
      </tr>
    </tbody>
  </table>
  
    <!--[if (!mso)&(!IE)]><!--></div><!--<![endif]-->
    </div>
  </div>
  <!--[if (mso)|(IE)]></td><![endif]-->
        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
      </div>
    </div>
  </div>
  
  
      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
      </td>
    </tr>
    </tbody>
    </table>
    <!--[if mso]></div><![endif]-->
    <!--[if IE]></div><![endif]-->
  </body>
  
  </html>`
  return `
  <body style="background: ${color.background};">
    <table width="100%" border="0" cellspacing="20" cellpadding="0"
      style="background: ${color.mainBackground}; max-width: 600px; margin: auto; border-radius: 10px;">
      <tr>
        <td align="center"
          style="padding: 10px 0px; font-size: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          Sign in to <strong>${escapedHost}</strong>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding: 20px 0;">
          <table border="0" cellspacing="0" cellpadding="0">
            <tr>
              <td align="center" style="border-radius: 5px;" bgcolor="${color.buttonBackground}"><a href="${url}"
                  target="_blank"
                  style="font-size: 18px; font-family: Helvetica, Arial, sans-serif; color: ${color.buttonText}; text-decoration: none; border-radius: 5px; padding: 10px 20px; border: 1px solid ${color.buttonBorder}; display: inline-block; font-weight: bold;">Sign
                  in</a></td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td align="center"
          style="padding: 0px 0px 10px 0px; font-size: 16px; line-height: 22px; font-family: Helvetica, Arial, sans-serif; color: ${color.text};">
          If you did not request this email you can safely ignore it.
        </td>
      </tr>
    </table>
  </body>
  `
}
