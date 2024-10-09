<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Booking Form -->
      <div class="col-md-6">
        <h2>立即訂位</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="date">預定日期</label>
            <input type="date" class="form-control" id="date" v-model="reservation.date" required>
          </div>
          <div class="form-group">
            <label for="number">人數</label>
            <select class="form-control" id="number" v-model="reservation.number" required>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10+</option>
            </select>
          </div>
          <div class="form-group">
            <label for="time">用餐時段</label>
            <select class="form-control" id="time" v-model="reservation.time" required>
              <option>午餐</option>
              <option>晚餐</option>
            </select>
          </div>
          <button type="submit" class="btn btn-primary">送出</button>
        </form>
      </div>

      <!-- Chef's Recommendations -->
      <div class="col-md-6">
        <h2>主廚推薦外帶專區</h2>
        <div class="row">
          <div class="col-sm-12 col-lg-4" v-for="dish in dishes" :key="dish.id">
            <div class="card">
              <div class="card-body">
                <img :src="require(`@/assets/img/${dish.imgSrc}`)" class="w-100" :alt="dish.name">
              </div>
              <div class="card-footer">
                {{ dish.name }}
                <a href="#">...加入訂單</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContentComponent',
  data() {
    return {
      reservation: {
        date: '',
        number: '',
        time: ''
      },
      dishes: [
        { id: 1, name: '肋眼牛排', imgSrc: 'dish1.jpg' },
        { id: 2, name: '義大利西西里披薩', imgSrc: 'dish2.jpg' },
        { id: 3, name: '豪華肋排特餐', imgSrc: 'dish3.jpg' }
      ]
    };
  },
  methods: {
    handleSubmit() {
      alert('您的訂位已提交！');
    }
  }
};
</script>

<style scoped>
/* Add component-specific styles here */
</style>
