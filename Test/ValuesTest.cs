using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Routing;
using AngularJSMultipleModuling.Controllers;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace Test
{
    [TestClass]
    public class ValuesTest
    {

        [TestMethod]
        public void Get_ShouldReturnTwoValues()
        {
            ValuesController valuesController = new ValuesController();
            string[] value = new[] {"value1", "value2"};
            valuesController.Configuration = new HttpConfiguration();
            valuesController.Configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new {id = RouteParameter.Optional});
            valuesController.RequestContext.RouteData = new HttpRouteData(
                route: new HttpRoute(),
                values: new HttpRouteValueDictionary {{"controller", "values"}});
            var response = valuesController.Get();
            Assert.AreEqual(response.Count(),value.Length);
        }
        [TestMethod]
        public void Get_WithParameter()
        {
            ValuesController valuesController = new ValuesController();

          
            valuesController.Configuration = new HttpConfiguration();
            valuesController.Configuration.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional });
            valuesController.RequestContext.RouteData = new HttpRouteData(
                route: new HttpRoute(),
                values: new HttpRouteValueDictionary { { "controller", "values" } });
            var response = valuesController.Get(1);
            Assert.AreEqual(response, "value");
        }
    }
}
