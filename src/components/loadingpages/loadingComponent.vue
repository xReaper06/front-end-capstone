<template>
    <div v-if="isLoading" class="loading-overlay">
        <div style="font-size: 24px; font-weight: bold; text-align: center; margin-top: 120px; color: #020303;">
            <p>Welcome to TiaViolation Viewing System</p><br>
            <img src="../tiavvsLogo.png" alt="" style="height: 300px; width: 300px;">
        </div>
</div>
</template>

<script>
export default {
    name:'LoadingComponent',
    props:{
        isLoading: Boolean,
    },
}
</script>

