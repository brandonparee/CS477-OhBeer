export default function() {
  BrowserPolicy.content.allowOriginForAll('*');
  BrowserPolicy.content.allowInlineStyles()
}
