app.get("/axios", (req, res) => {
    let task = {
        function: inlineSyntax().function,
        result: inlineSyntax().result
    }
    res.send(task);
});