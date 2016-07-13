$(document).ready(function() {
    
    $('#login-form').submit(function() {
        
        // get all the inputs into an array.
        var $inputs = $('#myForm :input');

        // not sure if you wanted this, but I thought I'd add it.
        // get an associative array of just the values.
        var values = {};
        $inputs.each(function() {
            values[this.name] = $(this).val();
        });
        
        var ehrId = values[0];
        console.log(values);
        var fname = "currentEhrID.txt";

        var ie_writeFile = function (fname, data) {

            var fso, fileHandle;
            fso = new ActiveXObject("Scripting.FileSystemObject");
            fileHandle = fso.CreateTextFile(fname, true);
            fileHandle.write(data);
            fileHandle.close();
        };

    });
});