<%@ Page Title="" Language="vb" AutoEventWireup="false" MasterPageFile="~/Main.Master" CodeBehind="frmCreateRequisition.aspx.vb" Inherits="eRequisitions2016.frmCreateRequisition" %>

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
    <table style="width:100%">
        <tr>
            <td colspan="12">
                <asp:Panel ID="pnlComms" Width="100%" runat="server">
                    <asp:Label ID="lblComms" runat="server" Text=""></asp:Label>
                </asp:Panel>
            </td>
        </tr>
    </table>
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
            <td colspan="2">Request Origin</td>
            <td colspan="10"><telerik:RadComboBox ID="cboBrancg" Width="100%" runat="server"></telerik:RadComboBox></td>
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
                <telerik:RadButton ID="btnSave" runat="server" Text="save"></telerik:RadButton>
                <telerik:RadButton ID="btncancel" runat="server" Text="cancel"></telerik:RadButton>
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
    </form>
</asp:Content>
