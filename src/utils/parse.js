export const getExports = (code) => {
    if(code.body) {
        const exports = code.body.find(node => {
            console.log(node);
            if(node.type === "ExpressionStatement" && node.expression) {
                const exp = node.expression
                console.log(exp)
                if(exp.type === "AssignmentExpression" && exp.left) {
                    if(exp.left.type === "MemberExpression" && exp.left.object.name === 'module' && exp.left.property.name === "exports") {
                        return true;
                    }
                }
            }
            return false;
        });
        return exports.expression;    
    }
    return null;
}