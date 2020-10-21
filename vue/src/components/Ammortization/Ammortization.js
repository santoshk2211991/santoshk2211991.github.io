
export default {
  name: "Ammortization",
  props: {},
  data() {
    return {
      enable: true,
      interest: 10,
      loanAmount: 0,
      val: 0,
      totInt: 0,
      totAmt: 0,
      list: [],
      formCount : '',
      formMnth : '',
      formPrincipal : ''
    };
  },
  methods: {
    computeAmmortization: function () {
      console.log(this.interest, this.loanAmount, this.date, this.months);

      let i = this.interest / 12 / 100;
      let P = this.loanAmount;
      let n = this.months;
      let exp = Math.pow(1 + i, n);

      this.computeMonthlyIntstallment(i, P, exp);
    },
    computeMonthlyIntstallment: function (i, P, exp) {
      let amount = (i * P * exp) / (exp - 1);
      this.val = amount.toFixed(2);

      this.computeEmiBreakdown(i, P, amount);
    },
    computeEmiBreakdown: function (i, P, amount) {
        console.log('initial',this.list)
      this.list = [];

      let tempBal = P;
      let tempInt;
      let tempPrincipal;
      let dateEmpty = true;
      let x;
      if (this.date == '' || this.date == undefined) {
        x = new Date();
        x.setMonth(x.getMonth() + 1);
      } else {
        x = new Date(this.date);
        dateEmpty = false;

      }
      for (let j = 0; j < this.months; j++) {
        let arr = {};
        tempInt = parseFloat(tempBal) * parseFloat(i);
        tempPrincipal = parseFloat(amount) - parseFloat(tempInt);

        for (var k = 0; k < this.val4; k++) {
          var formFieldDate = new Date(this.formMnth[k]);

          console.log("formMnth- " + monthDifference(x, formFieldDate));
          // console.log('j+1- '+(j+1));
          // if (parseInt(this.formMnth[k]) == (j + 1)) {
          if (parseInt(monthDifference(x, formFieldDate)) == 0) {
            console.log(this.formPrincipal[k]);
            if (
              this.formPrincipal[k] == "" ||
              this.formPrincipal[k] == undefined
            ) {
              this.formPrincipal[k] = 0;
            }
            console.log(
              "found month " + (j + 1) + "amount" + this.formPrincipal[k]
            );
            tempPrincipal =
              parseFloat(tempPrincipal) + parseFloat(this.formPrincipal[k]);
            break;
          } else {
            /*flag=false;*/
          }
        }

        tempBal = parseFloat(tempBal) - parseFloat(tempPrincipal);

        this.totInt = parseFloat(this.totInt) + parseFloat(tempInt);
        if (tempBal < 0) {
          console.log("balance less than 0");

          tempPrincipal = tempPrincipal + tempBal;
          tempBal = 0;

          var yDate = x.toDateString().split(" ");
          arr.tempDate = yDate[1] + "-" + yDate[3];
          arr.interest = tempInt.toFixed(2);
          arr.principal = tempPrincipal.toFixed(2);
          arr.balance = tempBal.toFixed(2);
          this.list.push(arr);
          x.setMonth(x.getMonth() + 1);
          console.log('if',this.list)

          break;
        } else {
          // x.setMonth(x.getMonth()+1);
          var yDate = x.toDateString().split(" ");
          arr.tempDate = yDate[1] + "-" + yDate[3];
          arr.interest = tempInt.toFixed(2);
          arr.principal = tempPrincipal.toFixed(2);
          arr.balance = tempBal.toFixed(2);

          this.list.push(arr);
          console.log('else',this.list)
          x.setMonth(x.getMonth() + 1);
        }

        console.log(i);
      }
    },
    monthDifference: function (date1, date2) {
      console.log("entering function" + "------" + date2 + "------" + date1);
      var months;
      var d1y = date1.getFullYear();
      var d2y = date2.getFullYear();

      months = (d2y - d1y) * 12;

      months = Math.abs(months) + Math.abs(date2.getMonth() - date1.getMonth());
      // months = months + date2.getMonth();

      console.log(months);
      return months;
    },
    custom : function (x) {
        let cusDur = x;
        let customInp = true;

        if (x == 1) {
          /* this.yearly = true;
          this.half  = false;
          this.quaterly = false;
          this.customInp = false;*/
          this.val4 = 1;
          this.range();
          this.formMnth[0] = 12;
        } else if (x == 2) {
          /*this.yearly = false;
          this.half  = true;
          this.quaterly = false;
          this.customInp = false;*/
          this.val4 = 2;
          this.range();
          this.formMnth[0] = 6;
          this.formMnth[1] = 12;

        } else if (x == 3) {
          /*this.yearly = false;
          this.half  = false;
          this.quaterly = true;
          this.customInp = false;*/
          this.val4 = 4;
          this.range();
          this.formMnth[0] = 3;
          this.formMnth[1] = 6;
          this.formMnth[2] = 9;
          this.formMnth[3] = 12;
        } else if (x == 4) {
          /*  this.yearly = false;
          this.half  = false;
          this.quaterly = false;
          this.customInp = true;*/
          this.val4 = 0;
          this.range();
        } else {
          /*this.yearly = false;
          this.half  = false;
          this.quaterly = false;
          this.customInp = false;*/
          this.customInp = false;
        }

      },
      range : function () {
        var n = this.val4;
        console.log(typeof(n));
        this.formCount = new Array(parseInt(n));
        this.formMnth = new Array(parseInt(n));
        this.formPrincipal = new Array(parseInt(n));
      }
  },
};
