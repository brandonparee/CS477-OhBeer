export default function() {
  //BrowserPolicy.content.allowOriginForAll('*');
  BrowserPolicy.content.allowInlineStyles()
  BrowserPolicy.content.allowFontDataUrl()
}
