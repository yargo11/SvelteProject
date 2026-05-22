<script lang="ts">
  import MyButton from "./MyButton.svelte";

  let { modalTitle, modalDescription, showModal = $bindable() } = $props();
</script>

{#if showModal}
  <div
    style="
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
    "
  >
    <h1>{modalTitle}</h1>
    <p>{modalDescription}</p>
    <MyButton bind:showModal />
  </div>
{/if}
