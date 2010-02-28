-module(gmail).
-export([email/2]).

email(Subject, Message) ->
    LocalTime = erlang:localtime(),    
    Date = httpd_util:rfc1123_date(LocalTime),
    
    {ok, Socket} = ssl:connect("smtp.gmail.com", 465, [{active, false}], 1000),
    recv(Socket),
    send(Socket, "HELO localhost"),
    send(Socket, "AUTH LOGIN"),
    send(Socket, binary_to_list(base64:encode("kungfooguru@gmail.com"))),
    send(Socket, binary_to_list(base64:encode(""))),
    send(Socket, "MAIL FROM: <kungfooguru@gmail.com>"),
    send(Socket, "RCPT TO:<kungfooguru@gmail.com>"),
    send(Socket, "DATA"),
    send_no_receive(Socket, "From: <kungfooguru@gmail.com>"),
    send_no_receive(Socket, "To: <kungfooguru@gmail.com>"),
    send_no_receive(Socket, "Date: " ++ Date),
    send_no_receive(Socket, "Subject: " ++ Subject),
    send_no_receive(Socket, ""),
    send_no_receive(Socket, Message),
    send_no_receive(Socket, ""),
    send(Socket, "."),
    send(Socket, "QUIT"),
    ssl:close(Socket).

send_no_receive(Socket, Data) ->
    ssl:send(Socket, Data ++ "\r\n").

send(Socket, Data) ->
    ssl:send(Socket, Data ++ "\r\n"),
    recv(Socket).

recv(Socket) ->
    case ssl:recv(Socket, 0, 1000) of
        {ok, _Return} -> ok; %io:format("~p~n", [Return]);
        {error, _Reason} -> error %io:format("ERROR: ~p~n", [Reason])                           
    end.
