using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace Calculadora
{
    public partial class Form1 : Form
    {
        private string currentCalculation = "";
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
        private void button_click(object sender, EventArgs e)
        {
            currentCalculation += (sender as Button).Text;
            txtOutPut.Text = currentCalculation;
        }

        private void button_Equal_click(object sender, EventArgs e)
        {
            string formattedCalculation = currentCalculation.ToString();
            try
            {
                txtOutPut.Text = new DataTable().Compute(formattedCalculation, null).ToString();
                currentCalculation = txtOutPut.Text;
            }
            catch (Exception ex)
            {
                txtOutPut.Text = "ERRO";
                currentCalculation = "";
            }
        }

        private void button_Clear_click(object sender, EventArgs e)
        {
            txtOutPut.Text = "0";
            currentCalculation = "";
        }

        private void button_clearEntery_click(object sender, EventArgs e)
        {
            if (currentCalculation.Length > 0)
            {
                currentCalculation = currentCalculation.Remove(currentCalculation.Length - 1, 1);
            }
            txtOutPut.Text = currentCalculation;
        }
    }
}