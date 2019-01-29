$(function() {
  var i = 0
  var imgWidth = $('#show-area ul li').width()

  var clone = $('#show-area ul li')
    .first()
    .clone()
  $('#show-area ul').append(clone)
  // copy第一张图片并且添加到最后达到无缝连接的效果

  var size = $('#show-area ul li').size() //得到所有li的个数

  /**
   * 第一步
   * # 开始循环添加按钮
   */
  for (var j = 0; j < size - 1; j++) {
    $('#controler').append('<div></div>')
  }

  // 为什么要size - 1？因为最后一张图片只是作一个过渡效果我们显示的始终还是4张图片
  // 所以添加按钮的时候我们也应该添加4个按钮
  $('#controler div')
    .eq(0)
    .addClass('onclick')

  // 左按钮
  $('#button-left').click(function() {
    Toleft()
  })

  // 右按钮
  $('#button-right').click(function() {
    Toright()
  })


  // 原点鼠标移出移入事件
  $('#controler div').hover(
    function() {
      i = $(this).index()
      clearInterval(timer)
      $('#show-area ul')
        .stop()
        .animate({ left: -i * imgWidth })
      $(this)
        .addClass('onclick')
        .siblings()
        .removeClass('onclick')
      $('#index').html('index的值：' + index)
    },
    function() {
      timer = setInterval(function() {
        Toright()
      }, 2000)
    }
  )

  // 图片鼠标移出移入事件
  $('#show-area ul').hover(
    function() {
      clearInterval(timer)
    },
    function() {
      timer = setInterval(function() {
        Toright()
      }, 2000)
    }
  )

  // 两个方向按钮鼠标移出移入事件
  $('#button-left,#button-right')
    .mouseover(function() {
      clearInterval(timer)
    })
    .mouseout(function() {
      timer = setInterval(function() {
        Toright()
      }, 2000)
    })

  // 定时器
  var timer = setInterval(function() {
    Toright()
  }, 2000)

  // 左按钮实现的函数
  function Toright() {
    i++
    if (i == size) {
      /** 
       * 当当前图片为最后一张图片的时候（我们一开始复制并且添加到ul最后面的图片）并且再点击了一次左按钮，
       * 这时候我们就利用css的快速转换效果把ul移动第一张图片的位置,
       * 并且第二张图片滑入达到无缝效果（css的变换效果很快我们肉眼是很难看见的）
       */ 
      $('#show-area ul').css({ left: 0 })
      i = 1
    }
    $('#show-area ul')
      .stop()
      .animate({ left: -i * imgWidth }, 1000)

    if (i == size - 1) {
      $('#controler div')
        .eq(0)
        .addClass('onclick')
        .siblings()
        .removeClass('onclick')
    } else {
      $('#controler div')
        .eq(i)
        .addClass('onclick')
        .siblings()
        .removeClass('onclick')
    }
  }

  // 右按钮实现的函数
  function Toleft() {
    // 同理，如果当前图片位置是第一张图片我再按一下右按钮那么我们也利用css的快速变换使它的位置来到最后一张图片的位置（size-1），并且让倒数第二张图片滑动进来
    i--
    if (i == -1) {
      $('#show-area ul').css({ left: -(size - 1) * imgWidth })
      i = size - 2
    }
    $('#show-area ul').animate({ left: -i * imgWidth }, 1000)
    $('#controler div')
      .eq(i)
      .addClass('onclick')
      .siblings()
      .removeClass('onclick')
  }
})
