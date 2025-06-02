// Preview logo kampus setelah diupload
document.getElementById('logo-upload').addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(evt) {
      document.getElementById('logo-preview').src = evt.target.result;
    };
    reader.readAsDataURL(file);
  }
});
