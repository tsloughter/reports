%% This is the application resource file (.app file) for the tabling,
%% application.
{application, tabling, 
  [{description, "Tabling report webapp"},
   {vsn, "0.1.0"},
   {modules, [tabling_app,
              
              tabling_sup,

              gmail,
              
              web_new,
              web_index]},
   {registered,[tabling_sup]},
   {applications, [kernel, stdlib, sasl, gas, ewlib, inets, nitrogen, couchbeam]},
   {mod, {tabling_app,[]}}]}.

