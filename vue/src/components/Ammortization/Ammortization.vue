<template>
  <div>
    <div class="row">
      <div class="col-md-12 row">
        <div class="col-md-6">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="interest">Interest:</span>
            </div>
            <input
              type="number"
              class="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="interest"
              v-model="interest"
            />
          </div>
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="loan-amount"
                >Loan Amount:</span
              >
            </div>
            <input
              type="number"
              class="form-control"
              placeholder="Loan"
              aria-label="Loan Amount"
              aria-describedby="loan-amount"
              v-model="loanAmount"
            />
          </div>
        </div>
        <div class="col-md-6">
          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="months">Months:</span>
            </div>
            <input
              type="number"
              class="form-control"
              placeholder="months"
              aria-label="Months"
              aria-describedby="months"
              v-model="months"
            />
          </div>

          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="date">Date:</span>
            </div>
            <input
              type="month"
              class="form-control"
              placeholder="date"
              aria-label="Date"
              aria-describedby="date"
              v-model="date"
            />
          </div>
        </div>
      </div>
    </div>

    <div>
      <button
        id="compBut"
        type="submit"
        v-on:click="computeAmmortization"
        class="btn btn-primary"
      >
        Compute
      </button>
    </div>

    <!-- <div class = "col-md-6" style ="background:red"> -->
    <div class="col-md-6">
      <form class="form-inline">
        <div class="form-group">
          <div class="dropdown">
            <button
              class="btn btn-primary dropdown-toggle"
              type="button"
              data-toggle="dropdown"
            >
              Excess principal payment options <span class="caret"></span>
            </button>
            <ul class="dropdown-menu">
              <!--  <li><a ng-model='yearly' ng-click = 'custom(1)'>Yearly</a></li> 
            <li><a ng-model='half' ng-click = 'custom(2)'>Half</a></li>
            <li><a  ng-model='quaterly' ng-click = 'custom(3)'>Quaterly</a></li> -->
              <li><a ng-model="quaterly" ng-click="custom(4)">Custom</a></li>
              <!-- <li><a  ng-model='quaterly' ng-click = 'custom(5)'>None</a></li> -->
            </ul>
          </div>

          <div>
            <div
              ng-show="customInp"
              class="sample-show-hide"
              style="clear: both"
            >
              <label>Excess Payment on Specific Months</label><br />
              <label>No of custom entries</label>
              <input
                type="text"
                ng-model="val4"
                class="form-control"
                ng-change="range()"
              /><br />
              <!--  <button ng-click='compute2()' class = "btn btn-primary">Compute</button>
             -->
              <label>please provide inputs</label>
              <table>
                <tr ng-repeat="a in formCount track by $index">
                  <td>
                    <!-- <input type="text"  class="form-control" ng-model='formMnth[$index]'> -->
                    <!-- <input type = "date" ng-model = "formMnth[$index]" class = "form-control" required/> -->
                    <input
                      type="month"
                      ng-model="formMnth[$index]"
                      class="form-control"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      ng-model="formPrincipal[$index]"
                      value="0"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <button
            id="compBut"
            type="submit"
            ng-click="compute1()"
            class="btn btn-primary"
          >
            Compute
          </button>
        </div>
      </form>
    </div>

    <!-- <div class = "col-md-6" style ="background:yellow" ng-model="checked" ng-show ="checked" ng-animate="'animate'"> -->
    <div
      class="col-md-6"
      ng-model="checked"
      ng-show="checked"
      ng-animate="'animate'"
    >
      <h1>Monthly Installment: {{ val }}</h1>
      <br />
      <h1>Total Amount payable: {{ totAmt }}</h1>
      <br />
      <h1>Total Interest payable: {{ totInt }}</h1>
      <br />
    </div>
  </div>
</template>

<script>
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
      val4: "",
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

      this.computeEmiBreakdown(i, P);
    },
    computeEmiBreakdown: function (i, P) {
      this.list = [];

      let tempBal = P;
      let tempInt;
      let tempPrincipal;
      for (let j = 0; j < n; j++) {
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

          break;
        } else {
          // x.setMonth(x.getMonth()+1);
          var yDate = x.toDateString().split(" ");
          arr.tempDate = yDate[1] + "-" + yDate[3];
          arr.interest = tempInt.toFixed(2);
          arr.principal = tempPrincipal.toFixed(2);
          arr.balance = tempBal.toFixed(2);

          this.list.push(arr);
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
</script>
