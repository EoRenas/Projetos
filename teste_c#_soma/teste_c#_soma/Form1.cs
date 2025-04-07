using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace teste_c__soma
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
        }
        
        private void Calculate_Click(object sender, EventArgs e) 
        {
            var number1 = Convert.ToInt32(txtNumber1.Text);
            var number2 = Convert.ToInt32(txtNumber2.Text);
            var result = number1 + number2;

            label1.Text = result.ToString();
        }

        private void Calculate_Click_1(object sender, EventArgs e)
        {
            Text = "Calculado";
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }
    }
}
