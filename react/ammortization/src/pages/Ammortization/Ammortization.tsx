import React, {Component, useState} from 'react';

export default class Ammortization extends Component{

    // const [interest:any, setInterest:any] = useState({});

    // const [portfolioData, setPortfoloioData] = useState<any[]>([]);
    state: any = {
        // optional second annotation for better type inference
        interest: 0,
        loanAmount:0,
        months:0,
        date:null,
        value:0,
        list: [],
        checked:true, 
        totInt: 0
      };

    constructor(props:any) {
        super(props);
        this.state = {interest: 0, loanAmount:0,
            months:0,
            date:null,value:0,
            list: [],
            checked:true, 
            totInt: 0};
    
        // This binding is necessary to make `this` work in the callback
        this.computeAmmortization = this.computeAmmortization.bind(this);
        this.updateState = this.updateState.bind(this);
        this.computeEmiBreakdown = this.computeEmiBreakdown.bind(this);
      }
    
      computeAmmortization() {
        // e.preventDefault();
        console.log('Compute Ammortization',this.state);
        let i = this.state.interest / 12 / 100;
      let P = this.state.loanAmount;
      let n = this.state.months;
      let exp = Math.pow(1 + i, n);
      this.computeMonthlyIntstallment(i, P, exp);

      }

      computeMonthlyIntstallment(i:any, P:any, exp:any) {
        let amount = (i * P * exp) / (exp - 1);
        let val = amount.toFixed(2);
        this.setState({...this.state,value:val})

  
        this.computeEmiBreakdown(i, P, amount);
      }
      updateState(e:any){
        console.log(e.target.id, e.target.value)
        let obj:any = {

        }
        obj[e.target.id] = e.target.value;
        this.setState({...this.state,...obj})
        console.log(this.state);
      }
   
      computeEmiBreakdown (i:any, P:any, amount:any) {
        console.log('initial',this.state)
      this.state.checked = true;
      let list = [];

      let tempBal = P;
      let tempInt;
      let tempPrincipal;
      let dateEmpty = true;
      let x;
      if (this.state.date == '' || this.state.date == undefined) {
        x = new Date();
        x.setMonth(x.getMonth() + 1);
      } else {
        x = new Date(this.state.date);
        dateEmpty = false;

      }
      for (let j = 0; j < this.state.months; j++) {
        let arr:any = {};
        tempInt = parseFloat(tempBal) * parseFloat(i);
        tempPrincipal = parseFloat(amount) - parseFloat(tempInt as unknown as string);

        // for (var k = 0; k < this.customMonthCount; k++) {
        //   var formFieldDate = new Date(this.formMnth[k]);

        //   console.log("formMnth- " + this.monthDifference(x, formFieldDate));
        //   // console.log('j+1- '+(j+1));
        //   // if (parseInt(this.formMnth[k]) == (j + 1)) {
        //   if (parseInt(this.monthDifference(x, formFieldDate)) == 0) {
        //     console.log(this.formPrincipal[k]);
        //     if (
        //       this.formPrincipal[k] == "" ||
        //       this.formPrincipal[k] == undefined
        //     ) {
        //       this.formPrincipal[k] = 0;
        //     }
        //     console.log(
        //       "found month " + (j + 1) + "amount" + this.formPrincipal[k]
        //     );
        //     tempPrincipal =
        //       parseFloat(tempPrincipal) + parseFloat(this.formPrincipal[k]);
        //     break;
        //   } else {
        //     /*flag=false;*/
        //   }
        // }

        tempBal = parseFloat(tempBal) - parseFloat(tempPrincipal as unknown as string);

        console.log('santosh..',tempInt, this.state.totInt)
        const totInt = parseFloat(this.state.totInt) + parseFloat(tempInt as unknown as string);
        console.log('santosh..',totInt)

        this.setState({...this.state,totInt:totInt})

        if (tempBal < 0) {
          console.log("balance less than 0");

          tempPrincipal = tempPrincipal + tempBal;
          tempBal = 0;

          var yDate = x.toDateString().split(" ");
          arr.tempDate = yDate[1] + "-" + yDate[3];
          arr.interest = tempInt.toFixed(2);
          arr.principal = tempPrincipal.toFixed(2);
          arr.balance = tempBal.toFixed(2);
          list.push(arr);
          x.setMonth(x.getMonth() + 1);
          console.log('if',list)

          break;
        } else {
          // x.setMonth(x.getMonth()+1);
          var yDate = x.toDateString().split(" ");
          arr.tempDate = yDate[1] + "-" + yDate[3];
          arr.interest = tempInt.toFixed(2);
          arr.principal = tempPrincipal.toFixed(2);
          arr.balance = tempBal.toFixed(2);

          list.push(arr);
          console.log('else',list)
          x.setMonth(x.getMonth() + 1);
        }

        console.log(i);
      }
      this.setState({...this.state, list: list})
    }
    monthDifference(date1:any, date2:any) {
      console.log("entering function" + "------" + date2 + "------" + date1);
      var months;
      var d1y = date1.getFullYear();
      var d2y = date2.getFullYear();

      months = (d2y - d1y) * 12;

      months = Math.abs(months) + Math.abs(date2.getMonth() - date1.getMonth());
      // months = months + date2.getMonth();

      console.log(months);
      return months;
    }
    render() {


        // function computeAmmortization(e:any) {
        //     e.preventDefault();
        //     console.log('You clicked submit.');
        //   }
        return(
            <>
            
            <div className="row">
      <button
        id="compBut"
        type="submit"
        onClick={this.computeAmmortization}
        className="btn btn-primary"
      >
        Compute
      </button>
    </div>
    <div className="row">
      <div className="col-md-12 row">
        
        <div className="col-md-6">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="interest">Interest:</span>
            </div>
            <input
              type="number"
              className="form-control"
              placeholder="Username"
              aria-label="Username"
              aria-describedby="interest"
              id='interest'
              onChange = {this.updateState}
              v-model="interest"
            />
          </div>
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="loan-amount"
                >Loan Amount:</span
              >
            </div>
            <input
              type="number"
              className="form-control"
              placeholder="Loan"
              aria-label="Loan Amount"
              aria-describedby="loan-amount"
              id="loanAmount"
              onChange = {this.updateState}

              v-model="loanAmount"
            />
          </div>
        </div>
        <div className="col-md-6">
          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="months">Months:</span>
            </div>
            <input
              type="number"
              className="form-control"
              placeholder="months"
              aria-label="Months"
              aria-describedby="months"
              onChange = {this.updateState}
            id="months"
              v-model="months"
            />
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="date">Date:</span>
            </div>
            <input
              type="month"
              className="form-control"
              placeholder="date"
              aria-label="Date"
              aria-describedby="date"
              id="date"
              onChange = {this.updateState}

              v-model="date"
            />
          </div>
        </div>
      </div>
    </div>  

<div className="row">

    <div
      className="col-md-6"
      ng-model="checked"
      ng-show="checked"
      ng-animate="'animate'"
    >
      <h1>Monthly Installment: {this.state.value}</h1>
      <br />
      <h1>Total Amount payable: {this.state.totAmt}</h1>
      <br />
      <h1>Total Interest payable: {this.state.totInt}</h1>
      <br />
    </div>
</div>
            </>

        )
    }
}