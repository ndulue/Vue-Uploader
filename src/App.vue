<template>
  <div>
    <div class="container mt-10">
      <div class="card bg-white">
        <img :src="image" alt="" style="">
        <input type="file" @change="handleImage" class="custom-input" accept="image/*">
      </div> 
    </div>
    <!--
    <div class="mt-10">
      <h3>SERVER IMAGE</h3>
      <img :src="remoteUrl" alt="">
    </div>
    -->
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  data () {
    return {
      image: '',
      remoteUrl: ''
    }
  },
  methods: {
    handleImage(e){
    const selected_Image = e.target.files[0];
    this.createBase64Image(selected_Image);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = e.target.result;
        this.uploadImage();
      }
      reader.readAsDataURL(fileObject);
    },
    uploadImage(){
      const { image } = this;
      axios.post('http://127.0.0.1:8081/upload', { image })
        .then((response) => {
          this.remoteUrl = response.data.url;
        })
        .catch((err) => {
          return new Error(err.message);
        })
    }
  },

}
</script>

<style>
* {
  font-family: Arial, Helvetica, sans-serif;
}
body {
  background: #d8dddb;
}
.container {
  display: flex;
  justify-content: center;
}
.mt-10{
  margin-top: 10rem;
}
.bg-white{
  background: #fff;
}
.card{
  height: 10rem;
  width: 20rem;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
}
img {
  width: 17em;
}
</style>


