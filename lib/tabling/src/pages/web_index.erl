-module (web_index).
-include_lib ("nitrogen/include/wf.inc").
-compile(export_all).

main() ->
    {ok, WWWRoot} = gas:get_env(tabling, wwwroot),
    #template { file=filename:join(WWWRoot, "template.html") }.

title() ->
    "Tabling Reports".

body() ->
    [
     #link{text="New Report", url="/web/new"}
    ].
    
