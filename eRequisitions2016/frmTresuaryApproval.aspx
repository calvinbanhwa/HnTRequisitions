<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Main.Master" CodeBehind="frmTresuaryApproval.aspx.vb" Inherits="eRequisitions2016.frmTresuaryApproval" %>
<%@ Register Assembly="Telerik.Web.UI" Namespace="Telerik.Web.UI" TagPrefix="telerik" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="ContentPlaceHolder1" runat="server">
    <form id="form1" runat="server">
        <telerik:RadScriptManager ID="RadScriptManager1" runat="server">
            <Scripts>
                <asp:ScriptReference Assembly="Telerik.Web.UI" Name="Telerik.Web.UI.Common.Core.js">
                </asp:ScriptReference>
                <asp:ScriptReference Assembly="Telerik.Web.UI" Name="Telerik.Web.UI.Common.jQuery.js">
                </asp:ScriptReference>
                <asp:ScriptReference Assembly="Telerik.Web.UI" Name="Telerik.Web.UI.Common.jQueryInclude.js">
                </asp:ScriptReference>
            </Scripts>
        </telerik:RadScriptManager>
        <asp:Panel ID="pnlComms" Width="100%" runat="server">
    <table style="width:100%">
        <tr>
            <td colspan="12">
                
                    <asp:Label ID="lblComms" runat="server" Text=""></asp:Label>
                
            </td>
        </tr>
    </table>
    </asp:Panel>
    <table style="width:100%">
        <tr>
            <td colspan="12" style="text-align: right">
                <asp:Label ID="lblTitle" runat="server" Text="Treasuary Approval" Font-Bold="True" Font-Size="Medium" ForeColor="#6699FF"></asp:Label></td>
        </tr>
        <tr>
            <td colspan="12">
                <asp:Panel ID="pnlSearch" GroupingText="Search Requisitions" runat="server" Font-Size="Medium">
                    <table style="width:100%">
                        <tr>
            <td colspan="2">Request No.</td>
            <td colspan="2">
                <telerik:RadTextBox ID="txtSearchRequestNo" Width="240px" runat="server"></telerik:RadTextBox></td>
            <td colspan="2">Branch Origin</td>
            <td colspan="2">
                <telerik:RadComboBox ID="cboBranchSearch" Width="240px" runat="server"></telerik:RadComboBox>
            </td>
            <td colspan="2">Request Type</td>
            <td colspan="2">
                <telerik:RadComboBox ID="cboRequetType" Width="240px" runat="server"></telerik:RadComboBox>
            </td>
        </tr>
        <tr>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="2">
                <asp:Button ID="btnSearch" runat="server" Text="search" /></td>

        </tr>
        <tr>
            <td colspan="12"></td>
        </tr>
                    </table>
                </asp:Panel>
            </td>
        </tr>
        <tr>
            <td colspan="12">
           <asp:Panel ID="Panel1" runat="server" GroupingText="Requisitions Details">
         <table style="width:100%">
           <tr>
            <td colspan="2">Order Number</td>
            <td colspan="10"></td>
        </tr>
        <tr>
            <td colspan="2">Request Date</td>
            <td colspan="10">
                <telerik:RadDatePicker ID="dtpRequestDate" runat="server"></telerik:RadDatePicker>
            </td>
        </tr>
        <tr>
            <td colspan="2">RequestType</td>
            <td colspan="10">
                <telerik:RadComboBox ID="cboRequestType" Width="100%" runat="server"></telerik:RadComboBox>
            </td>
        </tr>
        <tr>
            <td colspan="2">Requested By:</td>
            <td colspan="10"><telerik:RadTextBox ID="txtRequestBy" Width="100%" AutoComplete="off" runat="server"></telerik:RadTextBox></td>
        </tr>
        <tr>
            <td colspan="2">HOD Authorization By:</td>
            <td colspan="10"><telerik:RadTextBox ID="txtHODAuthorization" Width="100%" AutoComplete="off" runat="server"></telerik:RadTextBox></td>
        </tr>
             <tr>
            <td colspan="2">Finance Authorization By:</td>
            <td colspan="10"><telerik:RadTextBox ID="txtFinanceAuthorization" Width="100%" AutoComplete="off" runat="server"></telerik:RadTextBox></td>
        </tr>
        <tr>
            <td colspan="2">Request Origin</td>
            <td colspan="10"><telerik:RadComboBox ID="cboBranch" Width="100%" runat="server"></telerik:RadComboBox></td>
        </tr>
        <tr>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="2"></td>
            <td colspan="2"></td>
        </tr>
        <tr>
            <td colspan="2">Unit Price</td>
            <td colspan="10">
                <telerik:RadTextBox ID="txtUnitPrice" Width="100%" AutoComplete="off" runat="server"></telerik:RadTextBox></td>
        </tr>
        <tr>
            <td colspan="2">Quantity</td>
            <td colspan="10"><telerik:RadTextBox ID="txtQuantity" Width="100%" AutoComplete="off" runat="server"></telerik:RadTextBox></td>
        </tr>
        <tr>
            <td colspan="2">Description</td>
            <td colspan="10">
                <asp:TextBox ID="txtDescription" Width="100%" TextMode="MultiLine" Height="50px" runat="server"></asp:TextBox></td>
        </tr>
        <tr>
            <td colspan="2">Total Cost</td>
            <td colspan="10"><telerik:RadTextBox ID="txtTotalCost" ReadOnly="true" Width="100%" AutoComplete="off" runat="server"></telerik:RadTextBox></td>
        </tr>
        <tr>
            <td colspan="12" style="align-content:center">
                
                
            </td>
        </tr>
        <tr>
            <td colspan="12" style="align-content:center">
                <telerik:RadGrid ID="grdOrders" Width="100%" runat="server"></telerik:RadGrid></td>
        </tr>
        <tr>
            <td colspan="2">Total Request Amount:</td>
            <td colspan="10"><telerik:RadTextBox ID="txtTotalRequestAmount" ReadOnly="true" Width="100%" AutoComplete="off" runat="server"></telerik:RadTextBox></td>
        </tr>
        <tr>
            <td colspan="2">Request Status:</td>
            <td colspan="10"><telerik:RadTextBox ID="txtStatus" ReadOnly="true"  Width="100%" AutoComplete="off" runat="server"></telerik:RadTextBox></td>
        </tr>
        <tr>
            <td colspan="12" style="align-content:center; align-items:center; text-align: center;">
                <asp:RadioButton ID="rdApproved" AutoPostBack="true" Text="Authorize" GroupName="Authorization" runat="server" />
                <asp:RadioButton ID="rdReject" AutoPostBack="true" Text="Reject" GroupName="Authorize" runat="server" />
                <asp:RadioButton ID="rdHold" AutoPostBack="true" Text="Hold" GroupName="Authorize" runat="server" />
            </td>
        </tr>
        <tr>
            <td colspan="12" style="align-content:center ; align-items:center ; text-align: center;">
                <telerik:RadButton ID="btnSave" runat="server" Text="save"></telerik:RadButton>
            </td>
        </tr>
        <tr>
            <td colspan="2"></td>
            <td colspan="10"></td>
        </tr>
        <tr>
            <td colspan="2"></td>
            <td colspan="10"></td>
        </tr>
        <tr>
            <td colspan="2"></td>
            <td colspan="10"></td>
        </tr>
                    </table>
                </asp:Panel>
            </td>
        </tr>
    </table>
    </form>
</asp:Content>
