const React = require("react");
exports.onRenderBody = ({
    setHeadComponents,
    //   setPreBodyComponents,
    setPostBodyComponents,
}) => {

    const snippet = `"object"==typeof window.__REACT_DEVTOOLS_GLOBAL_HOOK__&&(__REACT_DEVTOOLS_GLOBAL_HOOK__.inject=function(){})`
    if (process.env.NODE_ENV === 'production') {
        setHeadComponents([
            <script dangerouslySetInnerHTML={{ __html: snippet }} />
        ]);
    }
    setPostBodyComponents([
        <script
            key="10"
            src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
        />,
        <script
            key="7"
            dangerouslySetInnerHTML={{
                __html: `
             function googleTranslateElementInit() {
              new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.FloatPosition.TOP_LEFT}, 'google_translate_element');
              }
             `
            }}
        />,
    ])
}