-module (web_new).
-include_lib ("nitrogen/include/wf.inc").
-compile(export_all).

-include("couchbeam.hrl").

main() ->
    {ok, WWWRoot} = gas:get_env(tabling, wwwroot),
    #template { file=filename:join(WWWRoot, "template.html") }.

title() ->
    "New Tabling Report".

body() ->
    [
     #label{text="Issue #"}, #textbox{id=issue_num},
     #label{text="Captain"}, #textbox{id=captain},
     #label{text="Location"}, #textbox{id=location},
     #label{text="Date DD/MM/YY"}, #textbox{id=date},
     #label{text="Members Present (Comma Separte, Please)"}, #textbox{id=members_present},
     #label{text="Members Absent (Comma Separte, Please)"}, #textbox{id=members_absent},
     #label{text="Papers Sold"}, #textbox{id=papers_sold},
     #label{text="Donations"}, #textbox{id=donations, text="0"},
     #label{text="Other Lit Sold"}, #textbox{id=other_lit_sold},
     #label{text="How was the sale? Any problems that came up? Debates? Successes with particular leads? Great ideas? Petitions used? What events were built? Is this sale better or worse than other sales you've had here? Issues with any members?"}, #textarea{id=assessment, style="width:600px;height:250px"},
     #br{},
     #button{text="Save", postback=save}
    ].
    
event(save) ->
    Connection = couchbeam_server:start_connection_link(#couchdb_params{host="beerenthusiasts.cloudant.com", username="beerenthusiasts", password=""}),
    Database = couchbeam_db:open_or_create(Connection, "tabling_reports"),

    IssueNumber = hd(wf:q(issue_num)),
    Captain = hd(wf:q(captain)),
    Location = hd(wf:q(location)),
    Date = hd(wf:q(date)),
    MembersPresent = hd(wf:q(members_present)),
    MembersAbsent = hd(wf:q(members_absent)),
    PapersSold = hd(wf:q(papers_sold)),
    Donations = hd(wf:q(donations)),
    OtherLitSold = hd(wf:q(other_lit_sold)),
    Assessment = hd(wf:q(assessment)),
    
    Report = {[
               {<<"issue_number">>, list_to_binary(IssueNumber)},
               {<<"captain">>, list_to_binary(Captain)},
               {<<"location">>, list_to_binary(Location)},
               {<<"date">>, list_to_binary(Date)},
               {<<"members_present">>, list_to_binary(MembersPresent)},
               {<<"members_absent">>, list_to_binary(MembersAbsent)},
               {<<"papers_sold">>, list_to_binary(PapersSold)},
               {<<"donations">>, list_to_binary(Donations)},
               {<<"other_lit_sold">>, list_to_binary(OtherLitSold)},
               {<<"assessment">>, list_to_binary(Assessment)}
              ]
             },
    
    couchbeam_db:save_doc(Database, Report),
    couchbeam_db:close(Connection, Database),
    couchbeam_server:close(Connection),

    Subject = "Issue #: " ++ IssueNumber ++ "\n" ++
        "Captain: " ++ Captain ++ "\n" ++
        "Location : " ++ Location ++ "\n" ++
        "Date : " ++ Date ++ "\n" ++
        "Members Present: " ++ MembersPresent ++ "\n" ++
        "Members Absent: " ++ MembersAbsent ++ "\n" ++
        "Papers Sold: " ++ PapersSold ++ "\n" ++
        "Donations : " ++ Donations ++ "\n" ++
        "Other Lit Sold : " ++ OtherLitSold ++ "\n" ++
        "Assessment " ++ Assessment,
    
    gmail:email("Sales Report for " ++ Date, Subject),

    wf:redirect("/web/index").
    
