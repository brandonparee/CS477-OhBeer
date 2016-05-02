export default function() {
  //BrowserPolicy.content.allowOriginForAll('*');
  BrowserPolicy.content.allowOriginForAll('blob:');
  BrowserPolicy.content.allowOriginForAll('*.amazonaws.com')


  BrowserPolicy.content.allowInlineStyles()
  BrowserPolicy.content.allowFontDataUrl()
  BrowserPolicy.content.allowSameOriginForAll();

}
