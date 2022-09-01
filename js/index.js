(function(){
  const names = [
    "贾文乐",
    "罗嘉平",
    "庄翰海",
    "袁翔宇",
    "叶钧",
    "杨尚",
    "王振海",
  ];
  const restaurantTopEl = document.getElementById('restaurantTop');
  const gameDagta = {
    id: 1,
    weed: 1,
    day: 1,
    money: 500,
    allCustomers: new Array(7).fill(1).map((item, index) => ({
      name: names[index],
      img: `customer-icon${index}.png`,
    })),
    queueWatiTime: 60000,
    time: 0,
    dayTime: 240000,
    loopTime: 100,
    cookSalary: 140,
    maxWaitCustomerNum: 6,
    cookAccelerateTime: 500,
    cookList: [
      {
        hasCook: true,
        status: "default", // default work finish
        enterTime: 0,
      },
      {
        hasCook: false,
        status: "default",
      },
    ],
    seatList: [
      {
        hasCustomer: false,
        status: "empty", // empty wait eat pay
      },
      {
        hasCustomer: false,
        status: "empty",
      },
      {
        hasCustomer: false,
        status: "empty",
      },
      {
        hasCustomer: false,
        status: "empty",
      },
    ],
    queueList: [],
    sto: null,
    status: "stop",
    menuCustomer: {},
    menuVisible: false,
    dishesQueue: [],
    dayCustomerData: [],
    settingVisible: false,
    speed: 1,

    createComeTo: () => {},
    loopCook: () => {},
    loopSeat: () => {},
    loop: ()  => {
      const startDate = new Date();
      gameData.time += gameData.loopTime;
      const currDayTime = Math.floor(gameData.time) % gameData.dayTime;
      if (currDayTime === 0) {
        gameData.createComeTo();
        if (gameData.day === 7) {
          gameData.money -= gameData.cookList.reduce((total, el) => {
            if (el.hasCook) {
              return (
                total +
                Math.min(
                  Math.ceil(
                    ((gameData.time - el.enterTime) / gameData.dayTime / 7) *
                      gameData.cookSalary
                  ),
                  gameData.cookSalary
                )
              );
            }
            return total;
          }, 0);
          gameData.day = 1;
          gameData.weed++;
        } else {
          gameData.day++;
        }
      }
      for (let i = 0; i < gameData.queueList.length; ) {
        gameData.queueList[i].queueWatiTime += gameData.loopTime;
        if (
          !gameData.queueList[i].toastFlag &&
          gameData.queueList[i].queueWatiTime > gameData.queueWatiTime / 2 &&
          gameData.seatList.some((el) => !el.hasCustomer)
        ) {
          gameData.queueList[i].toastFlag = true;
          RgToast.error("餐厅目前有空位，赶紧点击等位客人头像让客人入座就餐吧");
        }
        if (gameData.queueList[i].queueWatiTime >= gameData.queueWatiTime) {
          gameData.queueList.splice(i, 1);
        } else {
          i++;
        }
      }
      gameData.loopCook();
      gameData.loopSeat(currDayTime === 0);
      while (
        gameData.dayCustomerData.length > 0 &&
        gameData.dayCustomerData[0].time <= currDayTime
      ) {
        const currCustomer = gameData.dayCustomerData.shift();
        if (gameData.queueList.length < 6) {
          gameData.queueList.push({
            ...currCustomer,
            id: gameData.id++,
            queueWatiTime: 0,
          });
        }
      }
      gameData.sto = setTimeout(
        loop,
        Math.max(0, gameData.loopTime / gameData.speed - (new Date() - startDate))
      );
    }
  }
  const init = () => {
    restaurantTopEl.innerHTML = domComplie(restaurantTopEl, {
      weed: gameDagta.weed,
      day: gameDagta.day,
      time: Math.floor(gameDagta.time / 10000) % 24,
      money: gameDagta.money,
      setting: function() {
        console.log(111);
        console.log(this);
      }
    }, gameDagta);
  }
  init();
})()