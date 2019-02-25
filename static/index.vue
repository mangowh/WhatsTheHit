<template> <!-- body-->
  <div>
    <h1>{{title}}</h1>
    <p>
      <a href="/post">Click here for an example of a Post</a>
    </p>
    <p>
      <a href="/todo">TodoMVC</a>
    </p>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      title: ""
    };
  }
};
</script>