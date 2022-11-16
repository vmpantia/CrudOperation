using CrudOperation.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CrudOperation.Controllers
{
    public class EmployeeController : Controller
    {
        // GET: Employee
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetData()
        {
            using(DBModel db = new DBModel())
            {
                List<Employee> empList = db.Employees.ToList<Employee>();
                return Json(new { data = empList }, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpGet]
        public ActionResult AddorEdit(int employeeID = 0)
        {
            return View(new Employee());
        }

        [HttpPost]
        public ActionResult AddorEdit(Employee inputEmployee)
        {
            using(DBModel db = new DBModel())
            {
                db.Employees.Add(inputEmployee);
                db.SaveChanges();
                return Json(new { success=true, message="Saved Successfully" }, JsonRequestBehavior.AllowGet); 
            }
        }
    }
}