<template>
  <div>
    111111111
    <div class="row">
      <label class="column-4">
        <span>цена</span>
        <input :value="fields.price" @input="handlerInput($event, 'price')" />
      </label>
      <label class="column-4">
        <span>кол-во</span>
        <input :value="fields.amount" @input="handlerInput($event, 'amount')" />
      </label>
      <label class="column-4">
        <span>сумма</span>
        <input :value="fields.qty" @input="handlerInput($event, 'qty')" />
      </label>
      <button @click="sendMessage">Send</button>
    </div>
    <div class="row label-row">
      <span class="column-4">цена: {{ fields.price }}</span>
      <span class="column-4">кол-во: {{ fields.amount }}</span>
      <span class="column-4">сумма: {{ fields.qty }}</span>
      <span class="column-4">LocalStorage {{ DataLocalStorage }}</span>
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

import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      listChangeField: [],
      actions: {},
    };
  },
  computed: {
    ...mapGetters(['arrayEventReverse']),
    fields() {
      return this.$store.state.fields
    },
    price() {
      return this.$store.state.fields.price;
    },
    amount() {
      return this.$store.state.fields.amount;
    },
    qty() {
      return this.$store.state.fields.qty;
    },
    DataLocalStorage() {
      return this.$store.state.DataLocalStorage
    },
  },
  methods: {
    calculate(field) {
      let { qty, amount, price } = this.fields;
      let calc = {
        price: () => qty / amount,
        amount: () => qty / price,
        qty: () => amount * price,
      };
      this.$store.dispatch("changeFieldCalculate", {
        field,
        value: calc[field](),
      });
    },
    changeInput(event, field) {
      this.addEventList(
        "input",
        field,
        `Поле ${field} изменено: ${event.target.value}`
      );

      this.$store.dispatch("changeFieldCalculate", {
        field,
        value: event.target.value,
      });

      this.listChangeField = [
        field,
        ...this.listChangeField.filter((el) => el !== field),
      ];

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
      this.$store.dispatch('addEvents', { type, key, label });
    },

    sendMessage() {
      this.addEventList(
        "button",
        "send",
        localStorage.getItem("fieldsCalculate")
      );
      this.$store.dispatch("sendLocalStorage");
    },
  },
  mounted() {
    Object.keys(this.fields).forEach((key) => {
      this.actions[key] = debounce((event) => {
        this.changeInput(event, key);
      }, 300);
    });

    this.$store.dispatch('getLocalStorage')
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
</style>