//jquery functions
$(function(){
//function to set progressbar
$("#additionInfoProgressBar").progressbar({
			value: 53
		});
// function for the additional info accordions
$("#additionalAccordion").accordion({
			autoHeight: false,
			icons: {
    			header: "ui-icon-circle-arrow-e",
   				headerSelected: "ui-icon-circle-arrow-s"
			},
			collapsible: true,
			active: 0
		});
// function to remove ajax image uploaded
$("#ajaxImageRemoveConfirm").click(function(){
// we generate our dialog window
var txt = deleteConfirmHTML("This image will be permanently deleted and cannot be recovered. Do you want to continue?");
	if($("#dialog").length < 1){
$("body").append(txt);	
	$("#dialog").dialog({
			bgiframe: true,
			resizable: false,
			modal: true,
			overlay: {
				backgroundColor: '#000',
				opacity: 0.5
			},
			buttons: {
				'Delete Image': function() {
				//add your function here
					alert("deleted");
					$(this).dialog('close');
				},
				Cancel: function() {
					$(this).dialog('close');
				}
			}
});}
else {
$("#dialog").dialog('open');
}
});
// we add another screenshot window
$("#screenshotAdd").bind("click", function(e){var n = 0;
//we check the total count of forms already being displayed
$("#screenshotsFormWrapper table.tableForm").each(function() {
n = n + 1; //we get total amt of forms
});
//we generate a new input form that follows the previous
if(n < 4) {
var html = screenshotFormHTML(n);
// now we add the new table
$("#screenshotsFormWrapper").append(html);
applyExpand();
// and we bind a new rule to the new template
$("#ajaxImageRemoveConfirm"+n).bind("click",function(e){
// we generate our dialog window
var txt = deleteConfirmHTML("This image will be permanently deleted and cannot be recovered. Do you want to continue?");
	if($("#dialog").length < 1){
$("body").append(txt);	
	$("#dialog").dialog({
			bgiframe: true,
			resizable: false,
			modal: true,
			overlay: { backgroundColor: '#000', opacity: 0.5 },
			buttons: { 'Delete Image': function() {
				//add your function here
					alert("deleted");
					$(this).dialog('close');
				},
				Cancel: function() {
					$(this).dialog('close');
				}
			}
});}
else { $("#dialog").dialog('open'); }
});

} else { alert("reached limit."); }
});
// we add another video window
$("#videoAdd").bind("click", function(e){
var n = 0;
//we check the total count of forms already being displayed
$("#videosFormWrapper table.tableForm").each(function() {
n = n + 1; //we get total amt of forms
});
//we generate a new input form that follows the previous
if(n < 4) {
var html = videosFormHTML(n);
// now we add the new table
$("#videosFormWrapper").append(html);
applyExpand();
} else { alert("reached limit."); }
});
// we add another tutorial window
$("#tutorialAdd").bind("click", function(e){
var n = 0;
//we check the total count of forms already being displayed
$("#tutorialFormWrapper table.tableForm").each(function() { n = n + 1; });
//we generate a new input form that follows the previous
if(n < 4) {
var html = tutorialsFormHTML(n);
// now we add the new table
$("#tutorialFormWrapper").append(html);
applyExpand();
} else { alert("reached limit."); }
});
// this is to disable all the input fields and textareas for the video tab
$("#videoDisable").bind("click",function(e){
if( $("#videoDisable:checked").val() != null ){
//if checked do something here 
$("#videosMainForm").hide();
}
else{
$("#videosMainForm").show();
}
});
// this is to disable all the input fields and textareas for the screenshot tab
$("#ajaxImgDisable").bind("click",function(e){
if( $("#ajaxImgDisable:checked").val() != null ){
//if checked do something here
$("#ssMainForm").hide();
}
else{
$("#ssMainForm").show();
}
});
// this is to disable all the input fields and textareas for the tutorial tab
$("#tutorialDisable").bind("click",function(e){
if( $("#tutorialDisable:checked").val() != null ){
//if checked do something here
$("#tutorialMainForm").hide();
}
else{
$("#tutorialMainForm").show();
}
});
$("#basicInfoLicense").change(function(){
if($('#basicInfoLicense :selected').val() == "other"){
$("#otherLicense").show();
}
else {
$("#otherLicense").hide();
}
});
});
/* * * * * * * * * * * * * * * * * * * * 
 *	User Templates for modal windows
 *	[Here is where all the dynamic html is generated.]
 * * * * * * * * * * * * * * * * * * * */
function deleteConfirmHTML(text){
var txt = '<div id="dialog" title="Confirm deletion" style="display:none;">'; txt+='<p><span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>'+text+'</p>'; txt+='</div>';
return txt;
}
function screenshotFormHTML(n){
var txt ='<table id="ssForm'+n+'" class="tableForm" cellpadding="0" cellspacing="10">'; txt+='<div id="ssFormImg'+n+'" class="newDivWrap" id="ajaxImgWrapper'+n+'">'; txt+='<img src="/img/no-img.jpg" class="loading" alt="" />'; txt+='<a href="javascript:;" class="ajaxImageRemoveConfirm" id="ajaxImageRemoveConfirm'+n+'">x</a>'; txt+='</div>'; txt+='<tr>'; txt+='<td valign="top">Title:</td>'; txt+='<td><input type="text" class="formInput" style="width:350px;" value="" /></td>'; txt+='</tr>'; txt+='<tr>'; txt+='<td valign="top">Image:</td>'; txt+='<td><input type="file" style="width:350px;" value="" /></td>'; txt+='</tr>'; txt+='<tr>'; txt+='<td valign="top">Description:</td>'; txt+='<td><textarea class="formTextarea" style="width:350px;height:120px;" rows="5" value="" ></textarea></td>'; txt+='</tr>'; txt+='</table>';
return txt;
}
function videosFormHTML(n){
var txt ='<table id="videoForm'+n+'" class="tableForm" cellpadding="0" cellspacing="10">'; txt+='<tr>'; txt+='<td valign="top">Title:</td>'; txt+='<td><input type="text" class="formInput" style="width:350px;" value="" /></td>'; txt+='</tr>'; txt+='<tr>'; txt+='<td valign="top">Video Link:</td>'; txt+='<td><input type="file" style="width:350px;" value="" /></td>'; txt+='</tr>'; txt+='<tr>'; txt+='<td valign="top">Description:</td>'; txt+='<td><textarea class="formTextarea" style="width:350px;height:120px;" rows="5" value="" ></textarea></td>'; txt+='</tr>'; txt+='</table>';
return txt;
}
function tutorialsFormHTML(n){
var txt ='<table id="tutorialForm'+n+'" class="tableForm" cellpadding="0" cellspacing="10">'; txt+='<tr>'; txt+='<td valign="top">Title:</td>'; txt+='<td><input type="text" class="formInput" style="width:350px;" value="" /></td>'; txt+='</tr>'; txt+='<tr>'; txt+='<td valign="top">HTML:</td>'; txt+='<td><textarea rel="expand" class="formTextarea" style="width:350px;height:120px;" rows="32" value="" ></textarea></td>'; txt+='</tr>'; txt+='</table>';
return txt;
}
function applyExpand(){
$(function(){
$("textarea[rel*=expand]").focus(function(){
$(this).animate({backgroundColor: '#FCFCFC', color: '#656565', height: 500}, 10);
});
$("textarea[rel*=expand]").blur(function(){
$(this).animate({backgroundColor: '#FCFCFC', color: '#656565', height: 120}, 10);
});
});
}
applyExpand();