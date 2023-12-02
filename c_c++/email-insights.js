Lyte.Component.register(
    "crm-email-insights",
    {
        _template:
            '<template tag-name="crm-email-insights"> <div id="emailTrackingTab" class="pLR55 mT40 pR"> <div id="trackingInfoDiv" class="dN"></div> <div class="flexAlignCenter spaceBetween mB15"> <div class="flexAlignCenter {{if(isAdmin,\'\',\'eventNone\')}}"> <span class="f24 crm-font-semibold mR15">{{getI18n(\'crm.label.email.insights\')}}</span> <lyte-checkbox data-zcqa="email_insights_btn" lt-prop-type="switch" lt-prop-freeze="{{expHandlers(isAdmin,\'!\')}}" class="crmSwitchNoShadow" lt-prop-name="checkbox" lt-prop-checked="{{trackable}}" lt-prop-disabled="{{expHandlers(isAdmin,\'!\')}}" onclick="{{action(\'updateEmailInsights\',this)}}"></lyte-checkbox> </div> <span id="context-helplink" class="toplink cP" onclick="{{action(\'openHelp\',\'help.setup.emailinsights\',true,false)}}">{{getI18n(\'crm.label.context.help\')}}</span> </div> <div class="f13 mB25"> <template is="if" value="{{modifiedby}}"><template case="true"> {{modification}}&nbsp;{{getI18n(\'crm.label.simply.by\')}} {{modifiedby}} {{getI18n(\'on\')}} {{modifiedon}} </template></template> </div> <div class="mB10"> <span class="f13"> <span id="trackingDetails"></span> </span> </div> <div class="bold mB15"> <template is="if" value="{{trackable}}"><template case="true"> {{getI18n(\'crm.label.track.enabled.info\')}} </template><template case="false"> {{getI18n(\'crm.label.track.by.enabling\')}} </template></template> </div> <ul class="eTSInsightList p0 mL20"> <li class="eTSInsightLi">{{getI18n(\'crm.label.track.detailpage\')}}</li> <li class="eTSInsightLi">{{getI18n(\'crm.label.track.smartfilter\')}}</li> </ul> <template is="if" value="{{isStandard}}"><template case="true"> <ul class="disable eventNone eTSInsightList p0 mL20"> <li class="eTSInsightLi">{{getI18n(\'crm.label.track.report.templatestats\')}}</li> <li class="eTSInsightLi">{{getI18n(\'crm.label.track.templateversion\')}}</li> <li class="eTSInsightLi">{{getI18n(\'crm.label.track.report.emailanalytics\')}}</li> </ul> <div class="f13 red eTSInsightUpgrade mL5">{{getI18n(\'crm.label.track.upgrade\')}}</div> </template><template case="false"> <ul class="eTSInsightList p0 mL20"> <li class="eTSInsightLi">{{getI18n(\'crm.label.track.report.templatestats\')}}</li> <li class="eTSInsightLi">{{getI18n(\'crm.label.track.templateversion\')}}</li> <li class="eTSInsightLi">{{getI18n(\'crm.label.track.report.emailanalytics\')}}</li> <template is="if" value="{{emailWorkFlow}}"><template case="true"> <li class="eTSInsightLi">{{getI18n(\'crm.label.track.workflow.emails\')}}</li> </template></template> </ul> </template></template> <div class="eTSInsightNote mT40 p15"> <span class="crm-font-bold mB5 dIB">{{getI18n(\'crm.label.note2\')}}</span> <p class="f14"> <template is="if" value="{{trackable}}"><template case="true"> {{getI18n(\'crm.label.track.note.enabled\')}} </template><template case="false"> {{getI18n(\'crm.label.track.note.disabled\')}} </template></template> </p> </div> </div> </template>',
        _dynamicNodes: [
            { type: "attr", position: [1, 3, 1] },
            { type: "text", position: [1, 3, 1, 1, 0] },
            { type: "attr", position: [1, 3, 1, 3] },
            { type: "componentDynamic", position: [1, 3, 1, 3] },
            { type: "attr", position: [1, 3, 3] },
            { type: "text", position: [1, 3, 3, 0] },
            { type: "attr", position: [1, 5, 1] },
            {
                type: "if",
                position: [1, 5, 1],
                cases: {
                    true: {
                        dynamicNodes: [
                            { type: "text", position: [1] },
                            { type: "text", position: [3] },
                            { type: "text", position: [5] },
                            { type: "text", position: [7] },
                            { type: "text", position: [9] },
                        ],
                    },
                },
                default: {},
            },
            { type: "attr", position: [1, 9, 1] },
            { type: "if", position: [1, 9, 1], cases: { true: { dynamicNodes: [{ type: "text", position: [1] }] }, false: { dynamicNodes: [{ type: "text", position: [1] }] } }, default: {} },
            { type: "text", position: [1, 11, 1, 0] },
            { type: "text", position: [1, 11, 3, 0] },
            { type: "attr", position: [1, 13] },
            {
                type: "if",
                position: [1, 13],
                cases: {
                    true: {
                        dynamicNodes: [
                            { type: "text", position: [1, 1, 0] },
                            { type: "text", position: [1, 3, 0] },
                            { type: "text", position: [1, 5, 0] },
                            { type: "text", position: [3, 0] },
                        ],
                    },
                    false: {
                        dynamicNodes: [
                            { type: "text", position: [1, 1, 0] },
                            { type: "text", position: [1, 3, 0] },
                            { type: "text", position: [1, 5, 0] },
                            { type: "attr", position: [1, 7] },
                            { type: "if", position: [1, 7], cases: { true: { dynamicNodes: [{ type: "text", position: [1, 0] }] } }, default: {} },
                        ],
                    },
                },
                default: {},
            },
            { type: "text", position: [1, 15, 1, 0] },
            { type: "attr", position: [1, 15, 3, 1] },
            { type: "if", position: [1, 15, 3, 1], cases: { true: { dynamicNodes: [{ type: "text", position: [1] }] }, false: { dynamicNodes: [{ type: "text", position: [1] }] } }, default: {} },
        ],
        _observedAttributes: ["modification", "modifiedby", "modifiedon", "trackable"],
        data: function () {
            return { modification: Lyte.attr("string", { default: "Enabled" }), modifiedby: Lyte.attr("string"), modifiedon: Lyte.attr("string"), trackable: Lyte.attr("boolean", { default: !0 }) };
        },
        actions: {
            updateEmailInsights: function () {
                var t = this.getData("trackable"),
                    e = this;
                store.triggerAction("email_insights_record", "editTracking", null, { active: (!t).toString() }, "PUT").then(function (i) {
                    "SUCCESS" === i.email_insights.code &&
                        (t ? (e.setData("trackable", !1), e.setData("modification", I18n.getMsg('Disabled'))) : (e.setData("trackable", !0), e.setData("modification", I18n.getMsg('crm.label.enabled'))),
                        store.findAll("email_insights_record").then(function (t) {
                            var i = e.getFormattedDate(t.email_insights.modified_time);
                            e.setData("modifiedon", i), e.setData("modifiedby", t.email_insights.modified_by.name);
                        }));
                });
            },
        },
    },
    { mixins: ["crm-open-help", "email-insights-util"] }
),
    store.registerModel("email_insights_record", { id: Lyte.attr("string", { primaryKey: !0 }), active: Lyte.attr("string") }, { actions: { editTracking: {} } }),
    store.registerAdapter("email_insights_record", {
        namespace: "crm/email/v2/settings/emails/insights",
        buildURL: function (t, e, i, a, s, l) {
            return "editTracking" === l && (s = s.replace("/actions/" + l, "")), (s = s.replace("/email_insights_record", ""));
        },
        methodForRequest: function (t) {
            return "PATCH" === t ? "PUT" : t;
        },
    }),
    store.registerSerializer("email_insights_record", {
        payloadKey: function (t) {
            return t + "";
        },
        serialize: function (t, e, i, a) {
            return JSON.parse(a);
        },
        normalizeResponse: function (t, e, i) {
            var a = { id: "121212" };
            return (a.email_insights = i.email_insights), (i.email_insights_record = a), i;
        },
    }),
    Lyte.Mixin.register("email-insights-util", {
        getFormattedDate: function (t) {
            var e = new CrmDate(t),
                i = e.userHourIn24hrFmt,
                a = "AM";
            i > 12 ? ((i %= 12), (a = "PM")) : 12 === i && (a = "PM");
            var s = (i = i < 10 ? "0" + i : i) + ":" + (e.userDisplayMinute < 10 ? "0" + e.userDisplayMinute : e.userDisplayMinute) + " " + a;
            return e.userDisplayDay + ", " + e.userDisplayMonthName + " " + e.userDisplayDate + " " + e.userDisplayYear + " " + s;
        },
    });
