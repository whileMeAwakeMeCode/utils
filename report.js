
/*
                ____________________________________________________________________________
                ______     ______    ______    ______    ______    ______           ∞  ____
                ||__||     ||__      ||  ||    ||  ||    ||__||      ||             |  |___
                || \__.    ||____    ||        ||__||    || \__.     ||     ∞    |__|  ____|
                ____________________________________________________________________________

*/
/*  I n t e r n a l   T o o l s   */
// internal sameContent function
_sameContent = (a, b, failsafe) => {
    //report('isJSON', [isJSON(a), isJSON(b)])
    let A = Tools.isJSON(a) ? a : JSON.stringify(a)
    let B = Tools.isJSON(b) ? b : JSON.stringify(b)
    //
    if (failsafe) {
        Tools.report('sameContent', {failsafe:failsafe, A:A, B:B, match: A == B})

        if (failsafe === 'lengthOnly') {
            return A.length === B.length

        } else if (failsafe === 'length') {

            return (
                A.length === B.length &&
                A === B
            )
        }
    } 
    else return (A === B)
}

// DISPLAY FUNCTION
/**  
* @dev display the display object computed by report()
* @param disp the display object containing datas to display *passed by report()*
* @param eType the element improved typeof (argument "elems" from report())
* @notice disp {object} SHOULD contain keys [type, length, stringified, title, ranked]
*/
_display = (_disp, _eType) => {
    ((disp, eType) => {

        /// STRING ELEMENTS USED ///
        let _step = 'step'

        /// display requested options
        let step = disp.step ? ('                                                   <------ ' + disp.step + '\nstep: | '+ (disp.step || _step) + ' |\n*') : '' // : ''
        let from = disp.from ? ('\nreported from: | '+ disp.from + ' |') : ''
        let testStart = disp.testStart ? '\n            |*--------------------------------*|| T E S T   S T A R T ||*---------------------------------*|\n' : '\n'
        let hLighBottom = ''
        let then = disp.then ? '  \'----> then: '+disp.then+'...\n' : ''

        if (disp.highlight) {
            let hLighTop = '\n|-------------------------------------*| >>>  h i g h l i g h t e d  content  <<< |*----------------------------------------|' //+ '\n'
            hLighBottom = '\n|-----------------------------------------------------------* * *-----------------------------------------------------------|'
            console.log(testStart+hLighTop+'\n/**'+step+from+'\n----**| %s |**----', disp.title || _step)

        } else console.log(testStart+'/**'+step+from+'\n----**| %s |**----', disp.title || _step)

        // type
        if (disp.type)
            console.log(' type: %s', disp.type)

        // length
        if (disp.length)
            console.log(' length: %s', disp.length)

        /// display element
        // !object elements
        if (disp.stringified) {
            console.log('*\n'+disp.stringified+'\n*')

        }


        // object elements
        else if (disp.ranked) {

            // * default display * : used for non object elements if no options are provided
            if (eType === 'array') {

                disp.ranked.map((e, i) => {
                    if (typeof e === 'object' && e) {                    // object inside array
                        //report('Object.keys(e)', Object.keys(e), {from:'utils.js :: _display :: 601'})
                        console.log('-- %s %s --',Tools.ofType(e), i)
                        if (Object.keys(e)) {                       // object is {} // ERROR on adding a new agenda event when !Client.event
                            let objKeys = Object.keys(e)

                            if (disp.objKeys)
                            console.log('objectKeys: %s', objKeys)
                            if (objKeys <= 1) {
                                console.log(' - %s : %s', objKeys, typeof e[objKeys] !== 'object' ? e[objKeys] : JSON.stringify(e[objKeys]))
                            } else {
                                objKeys.forEach((_e) => {        // display each key : value  
                                    // if (disp.objKeys)
                                    //     console.log('  -* sub keys : %s *-', objKeys)
                                    console.log(' - %s : %s', _e, typeof e[_e] !== 'object' ? e[_e] : JSON.stringify(e[_e]))
                                })
                            }

                        } else { 
                            console.log('-- array %s --', i)                                   // object is []
                            disp.ranked.map((aElem, i) => {
                                //console.log('aElem: %s', aElem)
                                let arrKey = disp.arrKeys ? '- key : ' + disp.arrKeys[i] + '\n' : ''
                                console.log(arrKey+'- index %s : %s', i, typeof aElem !== 'object' ? aElem : JSON.stringify(aElem))
                            })
                        }

                    } else {
                        console.log(e)
                    }
                })


            } else if (eType === 'object') {    // disp.ranked keys mapping

                // compute element as a JSON string if possible/needed else return the element as it was or 'undefined' string
                Object.keys(disp.ranked).map((k, i) => {
                    //console.log('(disp.ranked[%s] : %s (%s))',k, disp.ranked[k], typeof disp.ranked[k])
                    console.log(' - %s : %s', k, typeof disp.ranked[k] !== 'object' ? disp.ranked[k] : Tools.forcedString(disp.ranked[k], {fail:true, functionString: disp.functionString}) )

                })
            } else {
                console.log(' '+disp.ranked)
            }



        }
        console.log('*/'+hLighBottom+'\n'+then)   



        setTimeout(() => { 
            if (disp.returnElement)  
            return disp.returnElement    
        })

    })(_disp, _eType)
}



/**
 * @dev Tools namespace containing all methods
 */
const Tools = {

     /**
     * @dev stringifyNestedKey verifies if Object obj[key] is well stringified: has no nested object that is not stringified (stringifies if needed)
     * @param obj the Object obj[key] to check clean stringifization of
     * @param keys an array of obj keys
     * @return a clean stringified Object obj[key]
     * @notice seeks if obj doesn't contain any nested object
     */
    stringifyNestedKey : (obj, keys) => {
        return new Promise((resolve, reject) => {

            var newObj = {}

            keys.map((key) => {
                newObj[key] = 
                Object.keys(obj[key]) ?
                JSON.stringify(obj[key]) : 
                obj[key]
            })

            setTimeout(() => {
                resolve(newObj)
            })

        })

    },

    /*********************************************************|  / TOOLS /  |**********************************************************/


    /* guarantee that the passed variable has a JSON type or not */
    /**
     */
    isJSON : (supJSON) => {

        try {
            // tryParsing = JSON.parse(supJSON) || undefined;
            // return tryParsing !== undefined
            if (JSON.parse(supJSON)) return true

        } catch(err) {
            return(false)
        }


    },

    /**
     * @dev responsible for verifying that client[keys] parsed version of an originally stringified nested object doesnt contain any nested stringified object that should be rendered as a plain object
     * @param obj the object to test (MAY be a Client object)
     */
    noJSONStrings : (obj) => {
        return new Promise(async (resolve, reject) => {
            var newObj = {}

            try {
                //report('verify that nested keys doesnt contain any JSON type', obj, {then:'check JSON value, map object keys'})
                var keys = Object.keys(obj);
                var keysMapped = await new Promise((mapped) => {
                    keys.map(async (key, i) => {

                        // check if obj[key] value has a JSON type 
                        var hasJSONValue = await new Promise((res) => {res(Tools.isJSON(obj[key]))});
                        //report('check JSON value of client[key]', {key:key, objKey: obj[key], hasJSONValue:hasJSONValue}, {step:8})
                        //report('the nested key hasJSONValue ?', {objKey: obj[key], hasJSONValue : hasJSONValue}, {step:'noJSONStrings: hasJSON ?', highlight:false})
                        //report('parsed / notparsed', [JSON.parse(obj[key]), obj[key]])

                        newObj[key] = await new Promise((res) => {
                            res(
                                hasJSONValue ?              
                                JSON.parse(obj[key]) :
                                obj[key]
                            )
                        })

                        if (i+1 === keys.length) {
                            //report('exit key mapping', {i:i+1, exitLen:keys.length}, {step:9})
                            mapped(newObj)

                        }
                    })
                })
                //report('new clean object with noJSON build (SHOULD NOT contain any stringified key', keysMapped, {step:'clean object (noJSONStrings)', stringify:true, inspect:true, highlight:true})

                var newKeysLen = Object.keys(keysMapped).length
                //report('check matching newKeysLen === keys.length ', {old_length : newKeysLen, new_length: keys.length, match: ( newKeysLen === keys.length )}, {step:11})

                if (newKeysLen === keys.length)
                    resolve(newObj)
                // computation failsafe
                else reject('* noJSONStrings FAILSAFE ERROR: lengths doesn\'t match *')


            } catch(err) {
                console.error(err);
                reject(err);
            }
        })
    },


    now : () => {
        return new Promise((res) => {
            var now = parseInt(Date.now() / 1000);
            res(now);
        })
    },

    sessionExpiry : () => {
        return new Promise(async (res, rej) => {
            var Now = await Tools.now();
            var Expiry = Now + process.env.SESSION_EXPIRY

            setTimeout(() => {
                res(Expiry)
            })
        })
    },
    /**
     * @dev return the type of a variable: string, array or object(ordonated object with keys)
     * @param elem the element to retrieve the type of
     */
    elemType : (elem) => {
        return new Promise((resolve, reject) => {

            setTimeout(() => {
                resolve(Tools.ofType(elem))
            })
        })
    },

    /**
     * @dev display with a regular format on console  
     * @param title title or step to display
     * @param elems *optional* an element to display for this step
     * @param opt *optional* display options object *passed to _display()*
     * @notice display options: :   
     *                              "type"(bool): improved version of typeof
     *                              "length": retrieve the real length of elems depending of its type
     *                              "inspect"(bool or string): 'true' returns all available options / "only" returns all precedent options only
     *                              "stringify"(boolean): display JSON as strings instead of ranked list default display
     *                              "highlight"(bool): highlights the report block
     *                              "step": add a step index on title line
     *                              "then": add a line after block to display a future step
     *                              "testStart": add a test top line to indicate start of test
     *                              "objKeys": display the keys of nested {object}
     *                              "functionString" : dont display 'function' type objects of 'elems' nested keys as strings but display 'function' instead
     *                              "from" : function name from which the report comes (or any other displayable information)
     *                              "returnElement" : returns the provided element
     *                              /// TODO ///
     *                                  "arrayKeys" : display a name for each index of an array (param 'elems')
     *                              ///
     * 
     * @return the passed element if option returnElement is positive (sync only) 
     */
    report : (title, elems, opt) => {
        if (!elems && elems != '') console.log('--* %s *--\n',typeof title !== 'object' ? title : JSON.stringify(title))

        else {
            var eType, eTypeOf
            // the display object used to display 
            var display = {
                title : title,
            }    // keys: type, length, stringified, title, ranked

            // clean type
            eTypeOf = typeof elems          // base type
            if (eTypeOf === 'object') { 
                eType = elems.length ? 'array' : 'object'

            } else eType = eTypeOf        

            /// case provided options
            if (opt) { 
                //* may be returned with opt.inspect('only) option
                // improved typeof elems
                if (opt.type || opt.inspect) {     
                    display.type = eType      
                }
                // elems.length
                if (opt.length || opt.inspect) {
                    display.length = eType !== 'object' ? elems.length : Object.keys(elems).length
                }

                /// global options
                /// TODO :: build a function to handle the build of display global functions
                // highlight title
                display.highlight = opt.highlight
                // step added to title
                display.step = opt.step
                // next step line
                display.then = opt.then
                // test top line
                display.testStart = opt.testStart
                // dont display function strings
                display.functionString = opt.functionString
                // display nested objects keys
                display.objKeys = opt.objKeys
                // display function from which the report comes
                display.from = opt.from
                // return the element
                display.returnElement = opt.returnElement ? elems : undefined


                //*
                //* return more than just the inspect datas ()
                if (opt.inspect !== 'only') {
                    // display objects in a stringified form
                    if (opt.stringify) {
                        // display stringified
                        display.stringified = eTypeOf === 'object' ? JSON.stringify(elems) : elems
                        // if (eTypeOf === 'object) console.log('*-stringified-*')
                    } else {
                        display.ranked = elems
                        // display with loop (ranked display: default)    
                    }
                }
                //*

            /// case no options
            } else {  
                display.ranked = elems 
            }


            setTimeout(() => {
                // display
                // let reqReturn = _display(display, eType)
                // console.log('*REQ RETURN*', reqReturn)
                return _display(display, eType)



            })
        }

    },
    

     /** 
     * @dev force computation of an object{}[] in a displayable
     * @param jsn the element to test/compute/return
     * @param opt *optional* options are : 
     *                              "failMsg"               // return a "can't display data" string statement instead of "undefined" is test failed
     *                              "functionString"        // return function type objects as a string "function" instead of stringified function 
     * @return may be equal to jsn or an 'undefined' string // NO ERR HANDLING: returns the 'undefined' string
     */
    forcedString : (jsn, opt) => {

        return (
            ((_jsn, _opt) => {
                let cantDisplay = "-->> can't display data <<--"
                var Return, tryJSON, tryString, _return;

                try { 
                    console.log('     ∞ forced string case ∞')
                    console.log('∞forced on : %s', _jsn)
                    console.log('∞options : %s', JSON.stringify(_opt))
                    console.log('∞typeof : %s', typeof _jsn)
                    // // NEW VERSION
                    // let tryJSON = isJSON(_jsn) ? JSON.parse(_jsn) : _jsn
                    // let Return = tryJSON ? tryJSON : String(_jsn+" (String())")

                    // setTimeout(() => {
                    //     return(
                    //         Return ? Return : ((_opt.fail || _opt.failMsg) ? (_opt.failMsg || cantDisplay) : cantDisplay)
                    //     )
                    // })

                    // OLD VERSION
                    console.log('typeof _jsn', typeof _jsn)
                    // use _jsn
                    tryJSON = (_opt.functionString && typeof _jsn === 'function') ? 'function' : JSON.stringify(_jsn)
                    //report('tryJSON', tryJSON, {inspect:true, from:'forcedString'})
                    tryString = tryJSON ? TryJSON : new String(_jsn)
                    //if (!tryJSON) report('tryString', tryString, {inspect:true})
                    _return = tryString.length > 0 ? tryString : _jsn
                    //if (_return) report('_return', _return, {inspect:true})

                    Return = _return ? _return : ((_opt.fail || _opt.failMsg) ? (_opt.failMsg || cantDisplay) : cantDisplay)

                    setTimeout(() => {
                        // test passed
                        //report('Return', Return, {inspect:true, from:'forcedString'})
                        return Return || (_opt.failMsg || cantDisplay) 
                    })


                } catch(err) {
                    // test failed
                    //console.log('forcedString FAILURE: %s', ' :: tryJSON FAILED ::' + err)
                    //return ((opt.fail || opt.failMsg) ? (opt.failMsg || "-->> can't display data <<--") : "undefined")
                    return (
                        Return ? 
                        Return :
                        (
                            tryJSON ? 
                            tryJSON : 
                            (
                                (_opt.fail || _opt.failMsg) ? 
                                (_opt.failMsg || cantDisplay) : 
                                cantDisplay
                            )
                        ) 
                    )
                }


            })(jsn, opt)
        )
    },




    /**
     * @dev return an empty element depending on requested type
     * @param request the type of element to return (objects are either "array" or "object")
     * @param returnType *optional* : retrieve the improved type of returned element
     * @return  - if "returnType" is true: an object { elem: the_computed_element, type: improved_typeof_returned_elem } 
     *          - if "returnType" is false (default): an element corresponding to request
     */
    empty : (request, returnType) => {
        switch (request) {
            case 'number' :
            return new Number()
            break

            case 'string' :
            return new String()
            break

            case 'boolean' :
            return new Boolean()
            break

            case 'object' :
            return new Object()
            break

            case 'array' :
            return new Array()

            default : 
            return undefined

        }

    },

    // return real type for objects 
    ofType : (elem) => {
        return(
            ((_e) => {

                let t = typeof _e 
                //console.log('\n- ofType receives -\n_e: %s\ntypeof _e: %s\n', _e, t)


                if (!_e) 
                    return 'undefined' 

                else if (t === 'object') 
                    return _e.length ? 'array' : 'object'

                else return t

            })(elem)
        )
    },

    /**
     * @dev Check is a provided length respects max or min
     * @param len the length to test / return
     * @notice option "max" : *optional* maximum length not to overflow
     * @notice option "min" : *optional* minimum length to respect
     * @return a boolean or len if an option is provided
     */
    respectLen : (len, opt) => {	
        //console.log('respectLen receives \nlen : %s\nopt : %s', len, JSON.stringify(opt))
        return (
            opt ? 
            ( opt.max ? len <= opt.max : len >= (opt.min || 0) ) :
            len
        )
    },

    /**
     * @dev know the real length of an element / how many elements an object contains
     * @param elem the element to test and return the length of  
     * @param opt the type of element you are looking 
     *              "numString"(bool) : return length of provided numbers as String(elem).length instead of default number return
     *              "fail"(any) : return a provided element of any type instead of default undefined 
     *              "restrict"(regular typeof or 'array') : request a test to determine if elem has a requested type, otherwise, return the 'fail' element 
     *              "minLen"(number) : restrict the test to a minimum length, return fail or undefined if passed test result is lower than minLen
     *              "maxLen"(number) : restrict the test to a maximum length, return fail or undefined if passed test result is higher than maxLen
     * 
     * @notice return numbers as provided except if a numString option is indicated
     * @notice *important* 'function' type is not handled
     */
    elemContains : (elem, opt) => {
        let t = typeof elem

        // restrict error / fail return
        if (opt.restrict && opt.restrict !== Tools.ofType(elem))
            return opt.fail || undefined

        else {

            switch (t) {
                case 'object' :
                //return elem.length ? elem.length : Object.keys(elem).length
                let noOverflow = Tools.respectLen(elem.length || Object.keys(elem).length, {max : opt.maxLen, min : opt.minLen})
                return (
                    noOverflow ?   // check for elem.length overflow (related on 'opt')
                    elem.length || Object.keys(elem).length :
                    opt.fail || undefined
                )
                break

                case 'number' :
                return opt.numString ? elem.toString().length : elem
                break

                case 'function' :
                // non handled 
                return undefined
                break

                default :
                let cond = (elem.length || (opt.fail || undefined))
                //return opt.restrict ? (opt.fail || cond) : cond
                return opt.restrict ? cond : elem.length
            }// end switch
        }// and else switch block

    },

    

    /**
     * @dev check matching of 2 elements
     * @param a : first element to test
     * @param b : second element to test or an array of element
     * @param failsafe *optional*  *see notice*
     * @notice  Failsafe options : 
     *          'lengthOnly' : test same length only   
     *          'length' : test exact matching + same length
     *          
     * @notice  if no failsafe is provided, default : exact matching 
     */
    sameContent : (a, b, failsafe) => {

        if (!b) return undefined
        else {
            //| new |/////////////
            // if b is an array with at least 2 elements, call _sameContent for each element to test matchin with param "a"
            if (Tools.elemContains(b, {restrict:'array', minLen:2, fail: 0})) {
                let fails = 0
                try {
                    b.forEach((e) => {
                        if (!_sameContent(a, e, failsafe))
                        fails++
                    })
                    return (fails === 0)

                } catch(err) {
                    return undefined
                }

            } else return _sameContent(a, b, failsafe);
            //////////////////////
        }
    },

    random : (mod) => {
        return Math.floor(Math.random() * (mod || 100000000))
    },
    
    /**
     * @dev the function that create functions
     * @notice USAGE: console.log(Tools.wrap('report', ["* HELLO FROM REPORT *", 'null', {inspect:true, step:3, highlight:'test wrapping'}]))

     */
    wrap : (fName, params) => {
    //console.log('received params callingFunction : ', params)
        // return a function calling the requested funName

        return (function(_n, _p) {
            let arr = [];
            //tocall(p[0], p[1], p[2]);
            return Tools[_n].apply(null, _p)
        })(fName, params)
        
        
    }
}

module.exports.tools = Tools


// TEST TOOLS NAMESPACE //
//console.log(Tools.wrap('report', ["* REPORT.js loaded *", '', {returnElem:true; step:'module loaded'}]))


