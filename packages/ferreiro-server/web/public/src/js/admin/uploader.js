// Initialize the header image uploader
setupImageUploader({
  uploaderButton: '#headerImageUploaderButton',
  uploaderForm: '#headerImageUploaderForm',
  loader: '#headerImageUploaderLoading',
  success: function (loader, form, data, statusCode) {
    const image = $('#picImage')
    const imageInput = $('#picInput')

    image.attr('src', data.permalink)
    imageInput.attr('value', data.permalink)
  },
  error: function (error, loader, form) {
    window.alert('Can not upload the image', error)
  },
  always: function (loader, form) {
    loader.hide()
  }
})

// Initialize other image uploader
setupImageUploader({
  uploaderButton: '#imageUploaderButton',
  uploaderForm: '#imageUploader',
  loader: '#imageUploaderLoader',
  hideButton: '#imageUploaderClear',
  success: function (loader, form, data, statusCode) {
    const imageUrl = $('#imageUploadedUrl')
    imageUrl.html(data.permalink)

    const image = $('#imageUploaded')
    image.hide(0)
    image.attr('src', data.permalink) // change image
    image.on('load', () => {
      // image loaded
      image.fadeIn(300)
      $('#imageUploaderWrapper').fadeIn(0)
    })
  },
  error: function (error, loader, form) {
    window.alert('Can not upload the image', error )
  },
  always: function (loader, form) {
    loader.hide()
  }
})

function setupImageUploader(opts) {
  const uploaderForm = $(opts.uploaderForm)
  const uploaderInputFile = $(opts.uploaderForm + " input[type=file]")
  const uploaderLoader = $(opts.loader)

  const uploaderButton = $(opts.uploaderButton)
  uploaderButton.click(function(event) {
    event.preventDefault()

    uploaderInputFile
      .click()
  })

  if (opts.hideButton) {
    const hideButton = $(opts.hideButton)
    hideButton.click(function(event) {
      event.preventDefault()
      $('#imageUploaderWrapper').fadeToggle()
    })
  }

  uploaderInputFile.on('change', function () {
    // The file input has been opened
    uploadImage()
  });

  // Best for ajax form!: https://stackoverflow.com/questions/166221/how-can-i-upload-files-asynchronously
  function uploadImage() {
    uploaderLoader.fadeIn(0)

    const successCallback = opts.success
    const errorCallback = opts.error
    const alwaysCallback = opts.always

    submitImage('/api/v1/upload-image', uploaderForm)
      .done(function (data, statusCode) {
        if (successCallback) {
          successCallback(uploaderLoader,
            uploaderForm, data, statusCode)
        }
      })
      .fail(function (error) {
        if (errorCallback) {
          errorCallback(error, uploaderLoader, uploaderForm)
        }
      })
      .always(function () {
        if (alwaysCallback) {
          alwaysCallback(
            uploaderLoader, uploaderForm)
        }
      })
  }
}

function submitImage (url, form) {
  return $.ajax({
    url: url,
    type: 'POST',
    data: new FormData($(form)[0]),

    // Tell jQuery not to process data or worry about content-type
    // You *must* include these options!
    cache: false,
    contentType: false,
    processData: false
  })
}