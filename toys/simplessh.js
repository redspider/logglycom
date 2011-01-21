loggly.bark.external_command({
    simplessh : {
        run: function ( args, stdin, context ) {
            if (stdin === undefined) return "No results";
            var result = [];
            // for each series in the returned data
            $.each( stdin.series, function( i,s ) {
                // for each result row
                $.each( s.data, function( j,d ) {
                    var m = /for invalid user ([^ ]+) from ([^ ]+)/.exec(d.text);
                    if (m) {
                        result.push({'user': m[1], 'ip': m[2]});
                    }
                });
            });

            var plist = [];
            $.each(result, function (i, r) {
                plist.push('<tr><td style="padding-right: 5px;">' + r.ip + '</td><td>' + r.user + '</td></tr>');
            });

            return ['<table><tr><th>IP</th><th>User</th></tr>', plist.join(''), '</table>'].join('');
        }
    }
});