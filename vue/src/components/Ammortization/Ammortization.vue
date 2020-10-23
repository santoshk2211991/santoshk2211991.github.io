<template>
<div class="row">
      <button
        id="compBut"
        type="submit"
        v-on:click="computeAmmortization"
        class="btn btn-primary"
      >
        Compute
      </button>
    </div>
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
              <li><a ng-model="quaterly" v-on:click="custom(4)">Custom</a></li>
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
                v-model="customMonthCount"
                class="form-control"
                v-on:change="range()"
              /><br />
              <!--  <button ng-click='compute2()' class = "btn btn-primary">Compute</button>
             -->
              <label>please provide inputs</label>
              <table>
                <tr v-for="(a, index) in formCount" :key="index">
                  <td>
                    <!-- <input type="text"  class="form-control" ng-model='formMnth[$index]'> -->
                    <!-- <input type = "date" ng-model = "formMnth[$index]" class = "form-control" required/> -->
                    <input
                      type="month"
                      v-model="formMnth[$index]"
                      class="form-control"
                      required
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      v-model="formPrincipal[$index]"
                    />
                  </td>
                </tr>
              </table>
            </div>
          </div>
<!-- 
          <button
            id="compBut"
            type="submit"
            v-click="compute1()"
            class="btn btn-primary"
          >
            Compute
          </button> -->
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

    <div class = "col-md-12" v-show ="checked">
    <div class="table-responsive" >
      <table class = "table table-bordered table-hover" >
        <tr class = "danger">
          <th>Month</th>
          <th >Interest</th>
          <th >Principal</th> 
          <th >Amount Outstanding</th>
        </tr> 
        <!-- <template v-for="x in list" :key="x.tempDate" bind-id="$index"
  bind-data="item">
        <tr  >
          <td>{{x.tempDate}}</td>
          <td >{{x.interest}}</td>
          <td >{{x.principal}}</td>
          <td >{{x.balance }}</td>
        </tr>

        </template> -->

        <tr v-for="x in list" :key="x.tempDate">
          <td>{{x.tempDate}}</td>
          <td >{{x.interest}}</td>
          <td >{{x.principal}}</td>
          <td >{{x.balance }}</td>
        </tr>
      </table>
    </div>
  </div>
  </div>
</template>

<script src="./Ammortization.js"></script>
<style src="./Ammortization.css"></style>


