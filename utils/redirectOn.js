const redirectOn = (verify, ...props) => ({
    ok: () => {

    },
    notOk: (redirectUrl) => {
        console.log(verify, "Test")
        const test = verify(...props);
        console.log(test)
        if(!res.ok) {
            return res.redirect(redirectUrl);
        };
        next();
    }
})

export default redirectOn;