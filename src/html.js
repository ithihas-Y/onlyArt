import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <div id="no_support"/>
        <script
          dangerouslySetInnerHTML={{ __html: `
              if(typeof window !== 'undefined' && typeof window.Proxy === 'undefined' ){
                let r = "<h1>This Browser is Not Supported</h1><p>Please Download a Modern Browser</p><a href='https://www.google.com/chrome/'>Download Google Chrome</a>"
                document.querySelector("body").innerHTML = r
              }
          ` }}
        />
        <div id="google_translate_element"></div> 
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
