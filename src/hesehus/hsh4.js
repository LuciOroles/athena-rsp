(function () {

    var targetDomElements = {
        contact_type: document.querySelectorAll('[name="type"][checked]')[0],
        first_name: document.getElementById('first_name'),
        last_name: document.getElementById('last_name'),
        email: document.getElementById('email'),
        company_name: document.getElementById('company_name'),
        phone: document.getElementById('phone'),

    }

    function targetExistsAndHasValue(target) {
        if (target) {
            if (target.value) {
                return true;
            }
        }
        return false;

    }

    function notEmpty(target) {
        if (targetExistsAndHasValue(target)) {
            if (target.value.length > 0) {
                return true;
            }
        }
        return false;
    }

    function validEmail(target) {
        if (!targetExistsAndHasValue(target)) return false;
        var email = target.value;
        var chrbeforAt = email.substr(0, email.indexOf('@'));
        if (!(email.trim().length > 127)) {
            if (chrbeforAt.length >= 2) {
                var re = /^(([^<>()[\]{}'^?\\.,!|//#%*-+=&;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
                return re.test(email);
            } else {
                return false;
            }
        } else {
            return false;
        }
    }


    function validPhone(target) {
        if (!targetExistsAndHasValue(target)) return false;
        if (!notEmpty(target)) return false;
        var phone = target.value,
            validDigitsArray = [], targetValidDigits = 6,
            phoneArr = phone.split(""), wrong = false;

        var testValidChar = phoneArr.every((vl) => {
            return (Number.isInteger(parseInt(vl, 10))
                ||
                vl === " "
                ||
                vl === "-");

        })
        console.log(testValidChar, "test valid char")
        if (!testValidChar) return false; //invalid chars where found
        validDigitsArray = phoneArr.filter((vl) => {
            return (Number.isInteger(parseInt(vl, 10)))
        });

        return validDigitsArray.length >= targetValidDigits;

    }

    var createValidators = function ({ first_name, last_name, email, company_name, phone }) {
        return {
            person: {
                rules: [
                    {
                        target: first_name,
                        validation: notEmpty
                    },
                    {
                        target: last_name,
                        validation: notEmpty
                    },
                    {
                        target: email,
                        validation: validEmail
                    }
                ]
            },
            company: {
                rules: [
                    {
                        target: email,
                        validation: validEmail
                    },
                    {
                        target: company_name,
                        validation: notEmpty
                    },
                    {
                        target: phone,
                        validation: validPhone
                    }
                ]
            }
        }
    }

    // appling the rules

    var applyValidators = function (rules) {
        return rules.every((rule) => {
            return rule["validation"](rule["target"])
        })
    }

    function triggerValid () {
        var typeOfValidation = targetDomElements.contact_type.value;
        if (!typeOfValidation) return false;
        var formValidators = createValidators(targetDomElements);
         return   applyValidators(formValidators[typeOfValidation].rules);
    }


    return triggerValid();


})();