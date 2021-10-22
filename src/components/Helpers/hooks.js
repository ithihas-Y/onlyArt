import { useEffect } from "react"
// Hook
export function useOnClickOutside(...args) {
    const handler = args[args.length-1]

    useEffect(
      () => {
        const listener = event => {
          // Do nothing if clicking ref's element or descendent elements
            // if(ref1.current === "div.style-block"){
            //     return;
            // }
            // console.log(ref1,ref2)
            let bool = false
            args.map( (arg,idx) => {
                if(idx !== args.length - 1){
                    if(!arg.current || arg.current.contains(event.target)){
                        // return
                        bool = true
                    }
                }
            })
            // if (!ref1.current || ref1.current.contains(event.target) || (!ref2?.current || ref2?.current?.contains(event.target))) {
            //     return;
            // }
            if(!bool){
                handler(event);
            }
        };
  
        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);
  
        return () => {
          document.removeEventListener('mousedown', listener);
          document.removeEventListener('touchstart', listener);
        };
      },
      // Add ref and handler to effect dependencies
      // It's worth noting that because passed in handler is a new ...
      // ... function on every render that will cause this effect ...
      // ... callback/cleanup to run every render. It's not a big deal ...
      // ... but to optimize you can wrap handler in useCallback before ...
      // ... passing it into this hook.
      [handler]
    );
}