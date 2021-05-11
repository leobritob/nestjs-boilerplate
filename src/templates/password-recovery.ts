interface PasswordRecoveryInterface {
  firstName: string
  url: string
}

export const PasswordRecoveryTemplate = (data: PasswordRecoveryInterface) => {
  return `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

  <html
    xmlns="http://www.w3.org/1999/xhtml"
    xmlns:o="urn:schemas-microsoft-com:office:office"
    xmlns:v="urn:schemas-microsoft-com:vml"
  >
    <head>
      <!--[if gte mso 9
        ]><xml
          ><o:OfficeDocumentSettings
            ><o:AllowPNG /><o:PixelsPerInch
              >96</o:PixelsPerInch
            ></o:OfficeDocumentSettings
          ></xml
        ><!
      [endif]-->
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta content="width=device-width" name="viewport" />
      <!--[if !mso]><!-->
      <meta content="IE=edge" http-equiv="X-UA-Compatible" />
      <!--<![endif]-->
      <title></title>
      <!--[if !mso]><!-->
      <!--<![endif]-->
      <style type="text/css">
        body {
          margin: 0;
          padding: 0;
        }
  
        table,
        td,
        tr {
          vertical-align: top;
          border-collapse: collapse;
        }
  
        * {
          line-height: inherit;
        }
  
        a[x-apple-data-detectors="true"] {
          color: inherit !important;
          text-decoration: none !important;
        }
      </style>
      <style id="media-query" type="text/css">
        @media (max-width: 520px) {
          .block-grid,
          .col {
            min-width: 320px !important;
            max-width: 100% !important;
            display: block !important;
          }
  
          .block-grid {
            width: 100% !important;
          }
  
          .col {
            width: 100% !important;
          }
  
          .col_cont {
            margin: 0 auto;
          }
  
          img.fullwidth,
          img.fullwidthOnMobile {
            max-width: 100% !important;
          }
  
          .no-stack .col {
            min-width: 0 !important;
            display: table-cell !important;
          }
  
          .no-stack.two-up .col {
            width: 50% !important;
          }
  
          .no-stack .col.num2 {
            width: 16.6% !important;
          }
  
          .no-stack .col.num3 {
            width: 25% !important;
          }
  
          .no-stack .col.num4 {
            width: 33% !important;
          }
  
          .no-stack .col.num5 {
            width: 41.6% !important;
          }
  
          .no-stack .col.num6 {
            width: 50% !important;
          }
  
          .no-stack .col.num7 {
            width: 58.3% !important;
          }
  
          .no-stack .col.num8 {
            width: 66.6% !important;
          }
  
          .no-stack .col.num9 {
            width: 75% !important;
          }
  
          .no-stack .col.num10 {
            width: 83.3% !important;
          }
  
          .video-block {
            max-width: none !important;
          }
  
          .mobile_hide {
            min-height: 0px;
            max-height: 0px;
            max-width: 0px;
            display: none;
            overflow: hidden;
            font-size: 0px;
          }
  
          .desktop_hide {
            display: block !important;
            max-height: none !important;
          }
        }
      </style>
      <style id="icon-media-query" type="text/css">
        @media (max-width: 520px) {
          .icons-inner {
            text-align: center;
          }
  
          .icons-inner td {
            margin: 0 auto;
          }
        }
      </style>
    </head>
    <body
      class="clean-body"
      style="
        margin: 0;
        padding: 0;
        -webkit-text-size-adjust: 100%;
        background-color: #f1f1f1;
      "
    >
      <!--[if IE]><div class="ie-browser"><![endif]-->
      <table
        bgcolor="#f1f1f1"
        cellpadding="0"
        cellspacing="0"
        class="nl-container"
        role="presentation"
        style="
          table-layout: fixed;
          vertical-align: top;
          min-width: 320px;
          border-spacing: 0;
          border-collapse: collapse;
          mso-table-lspace: 0pt;
          mso-table-rspace: 0pt;
          background-color: #f1f1f1;
          width: 100%;
        "
        valign="top"
        width="100%"
      >
        <tbody>
          <tr style="vertical-align: top" valign="top">
            <td style="word-break: break-word; vertical-align: top" valign="top">
              <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color:#f1f1f1"><![endif]-->
              <div style="background-color: transparent">
                <div
                  class="block-grid"
                  style="
                    min-width: 320px;
                    max-width: 500px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    margin: 0 auto;
                    background-color: #ffffff;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      background-color: #ffffff;
                    "
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#ffffff;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div
                      class="col num12"
                      style="
                        min-width: 320px;
                        max-width: 500px;
                        display: table-cell;
                        vertical-align: top;
                        width: 500px;
                      "
                    >
                      <div class="col_cont" style="width: 100% !important">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                          style="
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                            border-right: 0px solid transparent;
                            padding-top: 5px;
                            padding-bottom: 5px;
                            padding-right: 0px;
                            padding-left: 0px;
                          "
                        >
                          <!--<![endif]-->
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                          <div
                            style="
                              color: #555555;
                              font-family: Arial, Helvetica Neue, Helvetica,
                                sans-serif;
                              line-height: 1.2;
                              padding-top: 0px;
                              padding-right: 10px;
                              padding-bottom: 10px;
                              padding-left: 10px;
                            "
                          >
                            <div
                              class="txtTinyMce-wrapper"
                              style="
                                line-height: 1.2;
                                font-size: 12px;
                                color: #555555;
                                font-family: Arial, Helvetica Neue, Helvetica,
                                  sans-serif;
                                mso-line-height-alt: 14px;
                              "
                            >
                              <p
                                style="
                                  margin: 0;
                                  font-size: 16px;
                                  line-height: 1.2;
                                  word-break: break-word;
                                  text-align: center;
                                  mso-line-height-alt: 19px;
                                  margin-top: 0;
                                  margin-bottom: 0;
                                "
                              >
                                <span style="color: #ff9900; font-size: 16px"
                                  ><strong>Boilerplate NestJS</strong></span
                                >
                              </p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-color: transparent">
                <div
                  class="block-grid"
                  style="
                    min-width: 320px;
                    max-width: 500px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    margin: 0 auto;
                    background-color: #ffffff;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      background-color: #ffffff;
                    "
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#ffffff;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div
                      class="col num12"
                      style="
                        min-width: 320px;
                        max-width: 500px;
                        display: table-cell;
                        vertical-align: top;
                        width: 500px;
                      "
                    >
                      <div class="col_cont" style="width: 100% !important">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                          style="
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                            border-right: 0px solid transparent;
                            padding-top: 5px;
                            padding-bottom: 5px;
                            padding-right: 0px;
                            padding-left: 0px;
                          "
                        >
                          <!--<![endif]-->
                          <table
                            cellpadding="0"
                            cellspacing="0"
                            role="presentation"
                            style="
                              table-layout: fixed;
                              vertical-align: top;
                              border-spacing: 0;
                              border-collapse: collapse;
                              mso-table-lspace: 0pt;
                              mso-table-rspace: 0pt;
                            "
                            valign="top"
                            width="100%"
                          >
                            <tr style="vertical-align: top" valign="top">
                              <td
                                align="center"
                                style="
                                  word-break: break-word;
                                  vertical-align: top;
                                  padding-bottom: 0;
                                  padding-left: 40px;
                                  padding-right: 40px;
                                  padding-top: 20px;
                                  text-align: center;
                                  width: 100%;
                                "
                                valign="top"
                                width="100%"
                              >
                                <h1
                                  style="
                                    color: #555555;
                                    direction: ltr;
                                    font-family: Arial, Helvetica Neue, Helvetica,
                                      sans-serif;
                                    font-size: 23px;
                                    font-weight: normal;
                                    letter-spacing: normal;
                                    line-height: 120%;
                                    text-align: left;
                                    margin-top: 0;
                                    margin-bottom: 0;
                                  "
                                >
                                  <span style="color: #000000"
                                    >Olá,
                                    <strong>${data.firstName}</strong>!</span
                                  >
                                </h1>
                              </td>
                            </tr>
                          </table>
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-color: transparent">
                <div
                  class="block-grid"
                  style="
                    min-width: 320px;
                    max-width: 500px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    margin: 0 auto;
                    background-color: #ffffff;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      background-color: #ffffff;
                    "
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#ffffff;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div
                      class="col num12"
                      style="
                        min-width: 320px;
                        max-width: 500px;
                        display: table-cell;
                        vertical-align: top;
                        width: 500px;
                      "
                    >
                      <div class="col_cont" style="width: 100% !important">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                          style="
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                            border-right: 0px solid transparent;
                            padding-top: 5px;
                            padding-bottom: 5px;
                            padding-right: 0px;
                            padding-left: 0px;
                          "
                        >
                          <!--<![endif]-->
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 40px; padding-left: 40px; padding-top: 20px; padding-bottom: 20px; font-family: Arial, sans-serif"><![endif]-->
                          <div
                            style="
                              color: #555555;
                              font-family: Arial, Helvetica Neue, Helvetica,
                                sans-serif;
                              line-height: 1.2;
                              padding-top: 20px;
                              padding-right: 40px;
                              padding-bottom: 20px;
                              padding-left: 40px;
                            "
                          >
                            <div
                              class="txtTinyMce-wrapper"
                              style="
                                line-height: 1.2;
                                font-size: 12px;
                                color: #555555;
                                font-family: Arial, Helvetica Neue, Helvetica,
                                  sans-serif;
                                mso-line-height-alt: 14px;
                              "
                            >
                              <p
                                style="
                                  margin: 0;
                                  font-size: 16px;
                                  line-height: 1.2;
                                  word-break: break-word;
                                  text-align: left;
                                  mso-line-height-alt: 19px;
                                  margin-top: 0;
                                  margin-bottom: 0;
                                "
                              >
                                <span style="font-size: 16px; color: #000000">
                                  Foi solicitada a recuperação da sua senha. Para
                                  efetuar a troca da senha, clique no botão abaixo
                                  e siga as instruções.
                                </span>
                              </p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-color: transparent">
                <div
                  class="block-grid"
                  style="
                    min-width: 320px;
                    max-width: 500px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    margin: 0 auto;
                    background-color: #ffffff;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      background-color: #ffffff;
                    "
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#ffffff;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 40px; padding-left: 40px; padding-top:20px; padding-bottom:20px;"><![endif]-->
                    <div
                      class="col num12"
                      style="
                        min-width: 320px;
                        max-width: 500px;
                        display: table-cell;
                        vertical-align: top;
                        width: 500px;
                      "
                    >
                      <div class="col_cont" style="width: 100% !important">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                          style="
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                            border-right: 0px solid transparent;
                            padding-top: 20px;
                            padding-bottom: 60px;
                            padding-right: 40px;
                            padding-left: 40px;
                          "
                        >
                          <!--<![endif]-->
                          <div
                            align="center"
                            class="button-container"
                            style="
                              padding-top: 0;
                              padding-right: 10px;
                              padding-bottom: 0;
                              padding-left: 10px;
                            "
                          >
                            <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="border-spacing: 0; border-collapse: collapse; mso-table-lspace:0pt; mso-table-rspace:0pt;"><tr><td style="padding-top: 10px; padding-right: 10px; padding-bottom: 10px; padding-left: 10px" align="center"><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${data.url}" style="height:31.5pt;width:330pt;v-text-anchor:middle;" arcsize="10%" stroke="false" fillcolor="#ff9900"><w:anchorlock/><v:textbox inset="0,0,0,0"><center style="color:#ffffff; font-family:Arial, sans-serif; font-size:16px"><!
                            [endif]--><a
                              href="${data.url}"
                              style="
                                -webkit-text-size-adjust: none;
                                text-decoration: none;
                                display: block;
                                color: #ffffff;
                                background-color: #ff9900;
                                border-radius: 4px;
                                -webkit-border-radius: 4px;
                                -moz-border-radius: 4px;
                                width: 100%;
                                width: calc(100% - 2px);
                                border-top: 1px solid #ff9900;
                                border-right: 1px solid #ff9900;
                                border-bottom: 1px solid #ff9900;
                                border-left: 1px solid #ff9900;
                                padding-top: 5px;
                                padding-bottom: 5px;
                                font-family: Arial, Helvetica Neue, Helvetica,
                                  sans-serif;
                                text-align: center;
                                mso-border-alt: none;
                                word-break: keep-all;
                              "
                              target="_blank"
                              ><span
                                style="
                                  padding-left: 20px;
                                  padding-right: 20px;
                                  font-size: 16px;
                                  display: inline-block;
                                  letter-spacing: undefined;
                                "
                                ><span
                                  style="
                                    font-size: 16px;
                                    line-height: 2;
                                    word-break: break-word;
                                    mso-line-height-alt: 32px;
                                  "
                                  >Clique aqui para alterar sua senha</span
                                ></span
                              ></a
                            >
                            <!--[if mso]></center></v:textbox></v:roundrect></td></tr></table><![endif]-->
                          </div>
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <div style="background-color: transparent">
                <div
                  class="block-grid"
                  style="
                    min-width: 320px;
                    max-width: 500px;
                    overflow-wrap: break-word;
                    word-wrap: break-word;
                    word-break: break-word;
                    margin: 0 auto;
                    background-color: #ffffff;
                  "
                >
                  <div
                    style="
                      border-collapse: collapse;
                      display: table;
                      width: 100%;
                      background-color: #ffffff;
                    "
                  >
                    <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;"><tr><td align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:500px"><tr class="layout-full-width" style="background-color:#ffffff"><![endif]-->
                    <!--[if (mso)|(IE)]><td align="center" width="500" style="background-color:#ffffff;width:500px; border-top: 0px solid transparent; border-left: 0px solid transparent; border-bottom: 0px solid transparent; border-right: 0px solid transparent;" valign="top"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 0px; padding-left: 0px; padding-top:5px; padding-bottom:5px;"><![endif]-->
                    <div
                      class="col num12"
                      style="
                        min-width: 320px;
                        max-width: 500px;
                        display: table-cell;
                        vertical-align: top;
                        width: 500px;
                      "
                    >
                      <div class="col_cont" style="width: 100% !important">
                        <!--[if (!mso)&(!IE)]><!-->
                        <div
                          style="
                            border-top: 0px solid transparent;
                            border-left: 0px solid transparent;
                            border-bottom: 0px solid transparent;
                            border-right: 0px solid transparent;
                            padding-top: 5px;
                            padding-bottom: 5px;
                            padding-right: 0px;
                            padding-left: 0px;
                          "
                        >
                          <!--<![endif]-->
                          <!--[if mso]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding-right: 10px; padding-left: 10px; padding-top: 10px; padding-bottom: 10px; font-family: Arial, sans-serif"><![endif]-->
                          <div
                            style="
                              color: #555555;
                              font-family: Arial, Helvetica Neue, Helvetica,
                                sans-serif;
                              line-height: 2;
                              padding-top: 0px;
                              padding-right: 10px;
                              padding-bottom: 20px;
                              padding-left: 10px;
                            "
                          >
                            <div
                              class="txtTinyMce-wrapper"
                              style="
                                line-height: 2;
                                font-size: 12px;
                                color: #555555;
                                font-family: Arial, Helvetica Neue, Helvetica,
                                  sans-serif;
                                mso-line-height-alt: 24px;
                              "
                            >
                              <p
                                style="
                                  margin: 0;
                                  font-size: 12px;
                                  line-height: 2;
                                  word-break: break-word;
                                  text-align: center;
                                  mso-line-height-alt: 24px;
                                  margin-top: 0;
                                  margin-bottom: 0;
                                "
                              >
                                <span style="font-size: 12px; color: #ff9900"
                                  >Enviado por Boilerplate NestJS</span
                                >
                              </p>
                            </div>
                          </div>
                          <!--[if mso]></td></tr></table><![endif]-->
                          <!--[if (!mso)&(!IE)]><!-->
                        </div>
                        <!--<![endif]-->
                      </div>
                    </div>
                    <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    <!--[if (mso)|(IE)]></td></tr></table></td></tr></table><![endif]-->
                  </div>
                </div>
              </div>
              <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
            </td>
          </tr>
        </tbody>
      </table>
      <!--[if (IE)]></div><![endif]-->
    </body>
  </html>
  
  
`
}
