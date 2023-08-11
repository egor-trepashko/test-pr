<template>
  <div class="wrapper">
  <div class="container">
    <div class="row">
      <label class="column-4">
        <span>цена</span>
        <input :value="fields.price" @input="handlerInput($event, 'price')" />
      </label>
      <label class="column-4">
        <span>кол-во</span>
        <input :value="fields.qty" @input="handlerInput($event, 'qty')" />
      </label>
      <label class="column-4">
        <span>сумма</span>
        <input :value="fields.amount" @input="handlerInput($event, 'anount')" />
      </label>
      <button @click="sendMessage">Send</button>
    </div>
    <div class="row label-row">
      <span class="column-4">цена: {{ fields.price }}</span>
      <span class="column-4">кол-во: {{ fields.amount }}</span>
      <span class="column-4">сумма: {{ fields.qty }}</span>
      <span class="column-4">LocalStorage {{DataLocalStorage}}</span>
    </div>
    <div>
      EVENTS <br />
      <div class="log-list">
        <div class="log" v-for="(item, index) in arrayEventReverse" :key="item + index">
          <span >{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
function debounce(callback, time) {
  let isCooldown = false;
  var timeout;
  return function (argument) {
    function handleCallback(argument) {
      callback(argument);
      isCooldown = true;
    }

    if (!isCooldown) {
      handleCallback(argument);

      timeout = setTimeout(() => {
        isCooldown = false;
      }, time);
    } else {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        isCooldown = false;
        handleCallback(argument);
      }, time);
    }
  };
}


export default {
  data() {
    return {
      fields: {
        price: null,
        amount: null,
        qty: null,
      },
      nonce: 0,
      listChangeField: [],
      actions: {},
      arrayEvents: [],

      DataLocalStorage: {},
    };
  },
  computed: {
    arrayEventReverse() {
      return [...this.arrayEvents].reverse();
    },
  },
  methods: {
    calculate(field) {
      let { qty, amount, price } = this.fields;
      let calc = {
        price: () => amount / qty,
        qty: () => amount / price,
        amount: () => qty * price,
      };
      this.fields[field] = calc[field]();
    },
    changeInput(event, key) {
      this.addEventList(
        "input",
        key,
        `Поле ${key} изменено: ${event.target.value}`
      );

      this.fields[key] = event.target.value;

      this.listChangeField = [key,...this.listChangeField.filter((el) => el !== key),];

      if (this.listChangeField.length == 2) {
        let calcKey = Object.keys(this.fields).find((key) => {
          return !this.listChangeField.includes(key);
        });
        this.calculate(calcKey);
      } else if (this.listChangeField.length == 3) {
        this.calculate(this.listChangeField[2]);
      }
    },
    handlerInput(event, key) {
      this.actions[key](event, key);
    },
    addEventList(type, key, label) {
      this.arrayEvents.push({ type, key, label });
    },
    async sendLocalStorage() {
      function saveLocalStorage(data) {
        return new Promise((resolve) =>
          setTimeout(() => {
            let json = JSON.stringify(data);
            if (data.amount % 2 == 0) {
              localStorage.setItem("fieldsCalculate", JSON.stringify(json));
              resolve({ success: true });
            } else {
              resolve({ success: false });
            }
          }, 1000)
        );
      }
      this.nonce++;
      let data = { ...this.fields, nonce: this.nonce };
      let response = await saveLocalStorage(data);
      this.DataLocalStorage = localStorage.getItem("fieldsCalculate");
      this.addEventList("button", "save", {
        sendValue: data,
        localStorage: this.DataLocalStorage,
        response,
      });
    },

    sendMessage() {
      this.addEventList(
        "button",
        "send",
        localStorage.getItem("fieldsCalculate")
      );
      this.sendLocalStorage();
    },
  },
  mounted() {
    Object.keys(this.fields).forEach((key) => {
      this.actions[key] = debounce((event) => {
        this.changeInput(event, key);
      }, 300);
    });

    this.DataLocalStorage = localStorage.getItem("fieldsCalculate");
  },
};
</script>

<style lang="css" scoped>
.wrapper {
  display: flex;
  justify-content: center;
}
.container {
  width: 100%;
  max-width: 1024px;
}

.row {
  display: flex;
  align-items: left;
}
.column-4 {
  width: 25%;
}

label {
  margin-right: 16px;
}
label span {
  margin-right: 8px;
}
.label-row span {
  display: block;
  padding: 5px 15px;
}
.log-list {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.log {
  padding: 4px;
  text-align: left;
  border: 1px solid;
  width: 100%;
}
</style>