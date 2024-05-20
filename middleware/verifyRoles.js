const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.sendStatus(400)
        const rolesArray = [...allowedRoles]

        console.log(rolesArray) // will show the allowed roles
        console.log(req.roles[0]) // will show what roles inside that object!

        const result = req.roles.map(role => rolesArray.includes(role)).find(val => val === true);
        
        if(!result) return res.sendStatus(401)
        next();
    }
}

module.exports = verifyRoles

