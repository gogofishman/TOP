//5.1.0
//////////////////自定义设置
const portOfSplatoon = 47774; //底裤系带的位置
const usePostNamazu = true; //是否启用鲶鱼精？关闭填false，开启填true (关闭后，标记，聊天框播报都用不了)


//鲶鱼精聊天框全队播报
const PartyPostNamazu = true; //鲶鱼精聊天框全队播报总开关
const P1PostNamazu = true; //P1接线踩塔是否鲶鱼精聊天框全队播报
const P2PostNamazu = true; //P2狂暴倒计时是否鲶鱼精聊天框全队播报
const P3PostNamazu1 = true; //P3HW塔颜色播报
const P3PostNamazu = true; //P3小电视站位是否鲶鱼精聊天框全队播报
const P5PostNamazu = true; //P5是否鲶鱼精聊天框全队播报
const P6PostNamazu = true; //P6是否鲶鱼精聊天框全队播报


//标记
const useMark = true; //是否启用标记？（需确保鲶鱼精已启用）
const Mark = [1, 2, 3, 4, 5, 6]; //分P启用标记，不要开标记的P删掉（比如不要P3P5开那就 [1,2,4,6] ）
const onlyMeMark = true; //P1接线标记是否仅自己可见？
const onlyMeMarkP2 = false; //P2一运标记是否仅自己可见？
const onlyMeMarkP2_2 = false; //P2二运双T标记是否尽自己可见？
const onlyMeMarkP2_5 = false; //P2.5标记是否仅自己可见？
const onlyMeMarkP3 = false; //P3小电视点名标记是否仅自己可见？
const onlyMeMarkP5 = false; //P5点名标记是否仅自己可见？

const P2一运标记 = { //标记左边用攻击标记，右边锁链，从上到下1234 (因为没有锁链4，所以右4用方块代替)
    左1: 'attack1',
    左2: 'attack2',
    左3: 'attack3',
    左4: 'attack4',
    右1: 'bind1',
    右2: 'bind2',
    右3: 'bind3',
    右4: 'square',
};
const P5一运标记 = {
    外侧1: 'attack1',
    外侧2: 'attack2',
    内侧1: 'stop1',
    内侧2: 'stop2',
};
const P5二运标记 = {
    上: 'bind1',
    下: 'attack4',
    左: 'attack2',
    右: 'bind3',
    左上: 'attack1',
    右上: 'bind2',
    左下: 'attack3',
    右下: 'stop1'
};
const P5二运后半标记 = {
    远传递左: 'attack1',
    手引导左: 'attack2',
    手引导右: 'attack3',
    远传递右: 'attack4',
    世界近: 'bind1',
    世界远: 'stop1',
    近传递左: 'bind2',
    近传递右: 'bind3',
};
const P5三运三传标记 = {   //四传也一样，小电视等于拉线
    世界近: 'bind1',
    世界远: 'attack1',
    小电视左: 'stop1',
    小电视右: 'stop2',
    远传递左: 'attack2',
    远传递右: 'attack3',
    近传递上: 'bind2',
    近传递下: 'bind3',
};


//////////////////打法设置

//优先级（从上到下依次变低）,和cactbotSelf这个插件设置的优先级完全无关，本js独立
const 优先级 = [
    '战士',
    '白魔',
    '占星',
    '黑骑',
    '枪刃',
    '骑士',
    '武士',
    '镰刀',
    '武僧',
    '龙骑',
    '忍者',
    '机工',
    '诗人',
    '舞者',
    '黑魔',
    '召唤',
    '赤魔',
    '贤者',
    '学者'
];

//P2&P5
const 索尼 = { //设置的为从上到下的顺序
    圆圈: '第一排',
    叉: '第二排',
    三角: '第三排',
    方块: '第四排',
    倒_圆圈: '第四排',
    倒_叉: '第三排',
    倒_三角: '第二排',
    倒_方块: '第一排',
};
//P2一运分组击退，如果分摊点名同组，优先靠下面被点名的和他的连线对象换左右，你们自己固定队这么打

//P3小电视打法，1为十字、2为日基（日基打法只标点）、3什么都不报什么都不标
const P3TV = 2;


//函数
Array.prototype.交集 = function (array) {
    return this.filter((value) => array.includes(value));
};
Array.prototype.差集 = function (array) {
    return this.filter((x) => !array.includes(x));
};
Array.prototype.并集 = function (array) {
    return [...new Set([...this, ...array])];
};
Array.prototype.重复元素 = function () {
    let array = [...this];
    return array.filter((item, index) => array.indexOf(item) !== index);
};
Array.prototype.过滤重复元素 = function () {
    return [...new Set([...this])];
};

//鲶鱼精
function PostNamazu(type, text) {
    if (usePostNamazu) {
        if (type === 'queue') {
            callOverlayHandler({
                call: "PostNamazu",
                c: 'queue',
                p: JSON.stringify(text)
            });
            return
        }
        ;
        if (type === 'mark') {
            if (useMark) {
                callOverlayHandler({
                    call: "PostNamazu",
                    c: 'mark',
                    p: JSON.stringify(text)
                });
            }
            return
        }
        ;
        if (PartyPostNamazu) {
            callOverlayHandler({
                call: "PostNamazu",
                c: type,
                p: text
            });
        }
    }
};

function PostNamazuMarkClear() {
    if (usePostNamazu) {
        callOverlayHandler({
            call: "PostNamazu",
            c: 'command',
            p: '/mk clear <1>'
        });
        callOverlayHandler({
            call: "PostNamazu",
            c: 'command',
            p: '/mk clear <2>'
        });
        callOverlayHandler({
            call: "PostNamazu",
            c: 'command',
            p: '/mk clear <3>'
        });
        callOverlayHandler({
            call: "PostNamazu",
            c: 'command',
            p: '/mk clear <4>'
        });
        callOverlayHandler({
            call: "PostNamazu",
            c: 'command',
            p: '/mk clear <5>'
        });
        callOverlayHandler({
            call: "PostNamazu",
            c: 'command',
            p: '/mk clear <6>'
        });
        callOverlayHandler({
            call: "PostNamazu",
            c: 'command',
            p: '/mk clear <7>'
        });
        callOverlayHandler({
            call: "PostNamazu",
            c: 'command',
            p: '/mk clear <8>'
        });
    }
}

function PostNamazu测试(text) {
    callOverlayHandler({
        call: "PostNamazu",
        c: 'command',
        p: `/e ${text}`
    });
}

//POST
function Splatoon(namespace, time, data) {
    fetch(`http://127.0.0.1:${portOfSplatoon}/?namespace=${namespace}&destroyAt=${time}`, {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: data
    });
}

//ffd
// const FFD = {
//   颜色 : 'nomal2',
//   Send: (json) => {
//     fetch(`http://127.0.0.1:8001/rpc`, {
//       method: "POST",
//       mode: "no-cors",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify(json)
//     });
//   },
//   PosTranslation: (x, y, z, angle, distance) => {
//     // 点平移函数
//     // x,y为原始pos
//     // angle为平移弧度（南为0，北为3.14，顺时针为负，逆时针为正）
//     // distance为平移距离
//     // 返回最终点的[x,z,y]
//     if (typeof (x) != Number) x = Number(x)
//     if (typeof (y) != Number) y = Number(y)
//     if (typeof (z) != Number) z = Number(z)
//     if (typeof (angle) != Number) angle = Number(angle)
//     if (typeof (distance) != Number) distance = Number(distance)
//     let a = distance * Math.sin(angle);
//     let b = distance * Math.cos(angle);
//     return [x + a, z, y + b]
//   },
//   GetAng: (heading, where) => {
//     //用于获取以单位面向为标准的方向弧度（南为0，北为3.14，顺时针为负，逆时针为正）
//     //heading为当前面向弧度
//     //where为方位，填“下”“左”“右”
//     if (typeof (heading) != Number) heading = Number(heading)
//     let a = (heading >= 0) ? -Math.PI / 2 : Math.PI / 2;
//     let b = (heading >= 0) ? -Math.PI : Math.PI;
//     if (where === "下") return heading + b
//     if (where === "左") return heading + a
//     if (where === "右") return heading - a
//   },
//   Rad_Ang: (x, how) => {
//     //角度弧度转换函数
//     //how不填默认弧度转角度，填1角度转弧度
//     if (typeof (x) != Number) x = Number(x)
//     if (how === undefined) {
//       x = x * 180.0 / Math.PI
//     } else {
//       x = x * Math.PI / 180.0;
//     }
//     return x
//   },
//   send_feetfighter: (data, width, _width, length1, length2, duration) => {
//     //发送辣翅画图
//     //总宽度，中间留空宽度，向前长度，向后长度
//     let len = (width + _width) / 4;

//     let angle = FFD.GetAng(data.Heading, '左');
//     let temp = FFD.PosTranslation(data.PosX, data.PosY, data.PosZ, angle, len);
//     angle = FFD.GetAng(data.Heading, '下');
//     temp = FFD.PosTranslation(temp[0], temp[2], data.PosZ, angle, length2);

//     let angle2 = FFD.GetAng(data.Heading, '右');
//     let temp2 = FFD.PosTranslation(data.PosX, data.PosY, data.PosZ, angle2, len);
//     angle2 = FFD.GetAng(data.Heading, '下');
//     temp2 = FFD.PosTranslation(temp2[0], temp2[2], data.PosZ, angle2, length2);

//     let 辣翅1 = {
//       cmd: 'add_omen',
//       color: FFD.颜色,
//       shape_scale: {
//         key: "rect",
//         range: length1 + length2,
//         width: (width - _width) / 2,
//       },
//       pos: temp,
//       facing: data.Heading,
//       'duration': duration,
//     };
//     let 辣翅2 = {
//       cmd: 'add_omen',
//       color: FFD.颜色,
//       shape_scale: {
//         key: "rect",
//         range: length1 + length2,
//         width: (width - _width) / 2,
//       },
//       pos: temp2,
//       facing: data.Heading,
//       'duration': duration,
//     };

//     FFD.Send(辣翅1);
//     FFD.Send(辣翅2);
//   }
// };
//优先级初始化
let shunxu = [];
for (let i = 0; i < 优先级.length; i++) {
    let temp = {
        'job': 优先级[i],
        'order': i + 1
    };
    shunxu.push(temp);
}

var 想要的优先级数组;
Array.prototype.mySort = function (目标数组) {
    if (目标数组 === undefined) {
        目标数组 = 想要的优先级数组;
    }
    return this.sort((a, b) => {
        return 目标数组.indexOf(目标数组.find((c) => c.job === a)) - 目标数组.indexOf(目标数组.find((c) => c.job === b))
    });
};

/**
 * 将玩家的id名字转成中文职业名
 *
 * (如果有重复职业，则会报职业+id)
 * @param {string} name 玩家的名字
 * @param {object} data 直接传入data这个对象就行
 * @return {string}
 * @example
 * var job = nametocnjob('shiw ten',data);  //return '黑魔'
 */
function nametocnjob(name, data) {
    let enJob = data.party.jobName(name);
    if (enJob === undefined && data.me === name) enJob = data.job;
    let partylist = {};
    let joblist = {
        PLD: '骑士',
        MNK: '武僧',
        WAR: '战士',
        DRG: '龙骑',
        BRD: '诗人',
        WHM: '白魔',
        BLM: '黑魔',
        SMN: '召唤',
        SCH: '学者',
        NIN: '忍者',
        MCH: '机工',
        DRK: '黑骑',
        AST: '占星',
        SAM: '武士',
        RDM: '赤魔',
        GNB: '枪刃',
        DNC: '舞者',
        RPR: '镰刀',
        SGE: '贤者',
        BLU: '青魔',
    };
    Object.keys(data.party.nameToRole_).forEach(function (key) {
        partylist[key] = joblist[data.party.jobName(key)];
    });
    let 重复职业list = Object.values(partylist).重复元素();
    let myjob = joblist[enJob];

    //如果有重复职业，则会报职业+id，无重复就报职业
    let re = 重复职业list.includes(myjob) ? `${myjob} ${data.ShortName(name)}` : myjob;
    return re;
}

//计算差集,(大，小)
function subSet(arr1, arr2) {
    arr2 = (typeof (arr2) != 'object') ? [arr2] : arr2;
    let collectionD = arr1.filter(c => !arr2.some(d => d === c))
    collectionD = (collectionD.length === 1) ? collectionD[0] : collectionD;
    return collectionD;
}
var math = {
    /**
     *
     * @param {number} deg
     */
    角度转弧度: function (deg) {
        return deg * Math.PI / 180
    },
    /**
     *
     * @param {number} rad
     */
    弧度转角度: function (rad) {
        return rad * (180 / Math.PI)
    },
    /**
     * 求两点之间的距离：
     * @param {[x1,y1]} pos1 点1 [x1,y1]
     * @param {[x2,y2]} pos2 点2 [x2,y2]
     */
    两点距离: function (pos1, pos2) {
        let x1 = pos1[0];
        let y1 = pos1[1];
        let x2 = pos2[0];
        let y2 = pos2[1];
        let dis = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
        return dis
    },
    /**
     * 求两向量的夹角：
     *
     * 从主向量->比较向量，顺时针转为正角度，逆时针为负角度
     * @param {[number,number]} mainVector 主向量 [x1,y1]
     * @param {[number,number]} minorVector 比较向量 [x2,y2]
     * @param {0|1} type 0或者不填采用FF14的(100,100)的坐标体系，1采用数学(0,0)的坐标体系
     */
    向量夹角: function (mainVector, minorVector, type) {
        if (type != 1) {
            var x1 = mainVector[0] - 100;
            var y1 = -(mainVector[1] - 100);
            var x2 = minorVector[0] - 100;
            var y2 = -(minorVector[1] - 100);
        } else {
            var x1 = mainVector[0];
            var y1 = mainVector[1];
            var x2 = minorVector[0];
            var y2 = minorVector[1];
        }
        let angle = Math.acos((x1 * x2 + y1 * y2) / (Math.sqrt(x1 * x1 + y1 * y1) * Math.sqrt(x2 * x2 + y2 * y2)));
        let direction = x1 * y2 - x2 * y1 > 0 ? -1 : 1;
        return ((angle * direction) / Math.PI) * 180
    },
    /**
     * 现已知坐标原点，向量A坐标、目标向量B和向量A的夹角(带正负方向)、目标向量B的模长，求向量B的具体坐标
     *
     * （结果取小数点后两位，坐标系采用FF14的：即y轴上为负，下为正）
     * @param {number} angle    目标向量B和已知向量A的夹角(正为顺时针，负为逆时针)
     * @param {number} length    目标点到原点的长度
     * @param {[xA,yA]} posA 向量A坐标，默认[100,90]：即y轴向上部分
     * @param {[x0,y0]} pos0 原点坐标，默认[100,100]：即FF14地图中心点
     * @return {[x,y]}
     */
    向量求点: function (angle, length, posA, pos0) {
        if (posA === undefined) posA = [100, 90];
        if (pos0 === undefined) pos0 = [100, 100];
        posA = [posA[0] - pos0[0], pos0[1] - posA[1]];
        //求向量A的角度
        let angleA = math.向量夹角([0, 1], posA, 1);
        let angleB = angleA + angle;
        let radB = math.角度转弧度(angleB);
        let y = Math.cos(radB) * length;
        let x = Math.sin(radB) * length;
        let re = [Number((pos0[0] + x).toFixed(2)), Number((pos0[1] - y).toFixed(2))];
        return re;
    },
};

//欧米茄名字语言
const 欧米茄M = ['欧米茄M', 'Omega-M', 'オメガM'];
const 欧米茄F = ['欧米茄F', 'Omega-F', 'オメガF'];
const 眼睛 = ['オプチカルユニット', 'Optical Unit', '视觉组'];


const playstationMarkers = ['circle', 'cross', 'triangle', 'square'];

const headmarkers = {
    // vfx/lockon/eff/lockon5_t0h.avfx
    spread: '0017',
    // vfx/lockon/eff/tank_lockonae_5m_5s_01k1.avfx
    buster: '0157',
    // vfx/lockon/eff/z3oz_firechain_01c.avfx through 04c
    firechainCircle: '01A0',
    firechainTriangle: '01A1',
    firechainSquare: '01A2',
    firechainX: '01A3',
    // vfx/lockon/eff/com_share2i.avfx
    stack: '0064',
    // vfx/lockon/eff/all_at8s_0v.avfx
    meteor: '015A',
    P5二运红点名: '00F4',
};
const playstationHeadmarkerIds = [
    headmarkers.firechainCircle,
    headmarkers.firechainTriangle,
    headmarkers.firechainSquare,
    headmarkers.firechainX,
];
var bobao = ['上', '右上', '右', '右下', '下', '左下', '左', '左上'];
const playstationMarkerMap = {
    [headmarkers.firechainCircle]: '圆圈',
    [headmarkers.firechainTriangle]: '三角',
    [headmarkers.firechainSquare]: '方块',
    [headmarkers.firechainX]: '叉',
};
const firstMarker = parseInt('0017', 16);
const getHeadmarkerId = (data, matches) => {
    if (data.decOffset === undefined)
        data.decOffset = parseInt(matches.id, 16) - firstMarker;
    // The leading zeroes are stripped when converting back to string, so we re-add them here.
    // Fortunately, we don't have to worry about whether or not this is robust,
    // since we know all the IDs that will be present in the encounter.
    return (parseInt(matches.id, 16) - data.decOffset).toString(16).toUpperCase().padStart(4, '0');
};

var 射手天箭 = {
    内圈4: {
        "Name": "内圈4",
        "Group": "",
        "ZoneLockH": [
            1122
        ],
        "ElementsL": [
            {
                "Name": "",
                "refX": 96.4131,
                "refY": 103.60656,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 96.4131,
                "refY": 96.647,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 103.553,
                "refY": 103.60656,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 103.493,
                "refY": 96.367,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            }
        ]
    },
    中等4: {
        "Name": "中等4",
        "Group": "",
        "ZoneLockH": [
            1122
        ],
        "ElementsL": [
            {
                "Name": "",
                "refX": 92.1682,
                "refY": 107.631645,
                "refZ": 1.9073432E-06,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 107.97288,
                "refY": 108.00102,
                "refZ": -1.907354E-06,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 108.01027,
                "refY": 91.93993,
                "refZ": -1.907354E-06,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 92.052635,
                "refY": 92.02039,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            }
        ]
    },
    外圈8: {
        "Name": "外圈8",
        "Group": "",
        "ZoneLockH": [
            1122
        ],
        "ElementsL": [
            {
                "Name": "",
                "refX": 88.794495,
                "refY": 111.25071,
                "refZ": 1.9073432E-06,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 88.6255,
                "refY": 99.7109,
                "refZ": -1.907354E-06,
                "radius": 0.9,
                "color": 4278205183,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 88.71993,
                "refY": 88.526566,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 99.95172,
                "refY": 88.80651,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4278205183,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 111.38,
                "refY": 88.68,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 111.35302,
                "refY": 100.24613,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4278205183,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 111.33897,
                "refY": 111.29791,
                "refZ": -1.907354E-06,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 99.82139,
                "refY": 111.19131,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4278205183,
                "thicc": 5.0
            }
        ]
    },
    中等8: {
        "Name": "中等8",
        "Group": "",
        "ZoneLockH": [
            1122
        ],
        "ElementsL": [
            {
                "Name": "",
                "refX": 91.37199,
                "refY": 108.556305,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 91.44375,
                "refY": 99.60707,
                "refZ": -1.907354E-06,
                "radius": 0.9,
                "color": 4278205183,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 99.979904,
                "refY": 108.693306,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4278205183,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 108.53327,
                "refY": 108.60849,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 108.60915,
                "refY": 100.237564,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4278205183,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 108.661934,
                "refY": 91.29651,
                "refZ": -1.907354E-06,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 100.09634,
                "refY": 91.56524,
                "refZ": 1.9073432E-06,
                "radius": 0.9,
                "color": 4278205183,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 91.39042,
                "refY": 91.31222,
                "refZ": 9.5366886E-07,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            }
        ]
    },
    外圈4: {
        "Name": "外圈4",
        "Group": "",
        "ZoneLockH": [
            1122
        ],
        "ElementsL": [
            {
                "Name": "",
                "refX": 88.794495,
                "refY": 111.25071,
                "refZ": 1.9073432E-06,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 88.71993,
                "refY": 88.526566,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 111.38,
                "refY": 88.68,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 111.33897,
                "refY": 111.29791,
                "refZ": -1.907354E-06,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            }
        ]
    },
    外圈4_8: {
        "Name": "外圈4_8",
        "Group": "",
        "ZoneLockH": [
            1122
        ],
        "ElementsL": [
            {
                "Name": "",
                "refX": 88.794495,
                "refY": 111.25071,
                "refZ": 1.9073432E-06,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 111.33897,
                "refY": 111.29791,
                "refZ": 1.9073432E-06,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 88.71993,
                "refY": 88.526566,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 111.38,
                "refY": 88.68,
                "refZ": -5.456968E-12,
                "radius": 0.9,
                "color": 4293459712,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 88.25556,
                "refY": 106.205,
                "refZ": -1.907354E-06,
                "radius": 0.9,
                "color": 4278198527,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 93.796,
                "refY": 88.645,
                "refZ": -1.907354E-06,
                "radius": 0.9,
                "color": 4278198527,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 106.276,
                "refY": 111.385,
                "refZ": -1.907354E-06,
                "radius": 0.9,
                "color": 4278198527,
                "thicc": 5.0
            },
            {
                "Name": "",
                "refX": 111.376,
                "refY": 93.965,
                "refZ": -1.907354E-06,
                "radius": 0.9,
                "color": 4278198527,
                "thicc": 5.0
            }
        ]
    },
};
for (let i of Object.keys(射手天箭)) {
    射手天箭[i] = JSON.stringify(射手天箭[i]);
    射手天箭[i] = `~${射手天箭[i]}`;
}
;


Options.Triggers.push({
    zoneId: 1122,
    overrideTimelineFile: true,
    timelineFile: '绝欧.txt',
    initData: () => {
        return {
            P1全能之主: false,
            P1塔: [],
            inLine: {},
            塔次数: 0,
            一运: false,
            synergyMarker: {},
            spotlightStacks: [],
            职业优先级: {},
            一运击退换组: [],
            P1: true,
            P2一运分摊点名检测: false,
            P3: false,
            P3手臂次数: 0,
            P3HW轮次: 1,
            P3小电视点名: [],
            P4点名: [],
            P4波动炮: 1,
            P5: false,
            P5一运: false,
            P5二运: false,
        };
    },
    timelineTriggers: [
        {
            id: 'P1踩塔接线鲶鱼精',
            regex: /循环程序/,
            beforeSeconds: -1.5,
            run: (data, matches) => {
                //鲶鱼精播报
                let a = [
                    nametocnjob(Object.keys(data['inLine'])[0], data),
                    nametocnjob(Object.keys(data['inLine'])[1], data),
                    Object.keys(data['inLine'])[0],
                    Object.keys(data['inLine'])[1],
                ];
                let b = [
                    nametocnjob(Object.keys(data['inLine'])[2], data),
                    nametocnjob(Object.keys(data['inLine'])[3], data),
                    Object.keys(data['inLine'])[2],
                    Object.keys(data['inLine'])[3],
                ];
                let c = [
                    nametocnjob(Object.keys(data['inLine'])[4], data),
                    nametocnjob(Object.keys(data['inLine'])[5], data),
                    Object.keys(data['inLine'])[4],
                    Object.keys(data['inLine'])[5],
                ];
                let d = [
                    nametocnjob(Object.keys(data['inLine'])[6], data),
                    nametocnjob(Object.keys(data['inLine'])[7], data),
                    Object.keys(data['inLine'])[6],
                    Object.keys(data['inLine'])[7],
                ];
                if (data['职业优先级'][a[1]] < data['职业优先级'][a[0]]) {
                    let temp = a[0];
                    let temp2 = a[2];
                    a[0] = a[1];
                    a[2] = a[3];
                    a[1] = temp;
                    a[3] = temp2;
                }
                if (data['职业优先级'][b[1]] < data['职业优先级'][b[0]]) {
                    let temp = b[0];
                    let temp2 = b[2];
                    b[0] = b[1];
                    b[2] = b[3];
                    b[1] = temp;
                    b[3] = temp2;
                }
                if (data['职业优先级'][c[1]] < data['职业优先级'][c[0]]) {
                    let temp = c[0];
                    let temp2 = c[2];
                    c[0] = c[1];
                    c[2] = c[3];
                    c[1] = temp;
                    c[3] = temp2;
                }
                if (data['职业优先级'][d[1]] < data['职业优先级'][d[0]]) {
                    let temp = d[0];
                    let temp2 = d[2];
                    d[0] = d[1];
                    d[2] = d[3];
                    d[1] = temp;
                    d[3] = temp2;
                }
                data.P1分组 = [a, b, c, d];
                if (P1PostNamazu) {
                    PostNamazu('queue', [
                        {
                            c: 'command',
                            p: '/p ==============',
                        },
                        {
                            c: 'command',
                            p: '/p 1塔3线：' + a[0] + ' ' + a[1],
                            d: 20,
                        },
                        {
                            c: 'command',
                            p: '/p 1线3塔：' + c[0] + ' ' + c[1],
                            d: 20,
                        },
                        {
                            c: 'command',
                            p: '/p 2塔4线：' + b[0] + ' ' + b[1],
                            d: 20,
                        },
                        {
                            c: 'command',
                            p: '/p 2线4塔：' + d[0] + ' ' + d[1],
                            d: 20,
                        },
                    ]);
                }
                PostNamazuMarkClear();
            },
        },
        {
            id: 'P1接线标记1',
            regex: /冲击波 1/,
            beforeSeconds: 10,
            run: (data, matches) => {
                if (!Mark.includes(1)) return
                PostNamazu('mark', {
                    Name: data.P1分组[2][2],
                    MarkType: 'bind1',
                    LocalOnly: onlyMeMark,
                });
                PostNamazu('mark', {
                    Name: data.P1分组[2][3],
                    MarkType: 'bind2',
                    LocalOnly: onlyMeMark,
                });
            },
        },
        {
            id: 'P1接线标记2',
            regex: /冲击波 2/,
            beforeSeconds: 10,
            run: (data, matches) => {
                if (!Mark.includes(1)) return
                PostNamazu('mark', {
                    Name: data.P1分组[3][2],
                    MarkType: 'bind1',
                    LocalOnly: onlyMeMark,
                });
                PostNamazu('mark', {
                    Name: data.P1分组[3][3],
                    MarkType: 'bind2',
                    LocalOnly: onlyMeMark,
                });
            },
        },
        {
            id: 'P1接线标记3',
            regex: /冲击波 3/,
            beforeSeconds: 10,
            run: (data, matches) => {
                PostNamazu('mark', {
                    Name: data.P1分组[0][2],
                    MarkType: 'bind1',
                    LocalOnly: onlyMeMark,
                });
                PostNamazu('mark', {
                    Name: data.P1分组[0][3],
                    MarkType: 'bind2',
                    LocalOnly: onlyMeMark,
                });
            },
        },
        {
            id: 'P1接线标记4',
            regex: /冲击波 4/,
            beforeSeconds: 10,
            run: (data, matches) => {
                if (!Mark.includes(1)) return
                PostNamazu('mark', {
                    Name: data.P1分组[1][2],
                    MarkType: 'bind1',
                    LocalOnly: onlyMeMark,
                });
                PostNamazu('mark', {
                    Name: data.P1分组[1][3],
                    MarkType: 'bind2',
                    LocalOnly: onlyMeMark,
                });
            },
        },
        {
            id: 'P1接线标记清除',
            regex: /冲击波 4/,
            beforeSeconds: -1,
            run: (data) => {
                PostNamazuMarkClear();
            },
        },
        {
            id: 'P2一运标记清除',
            regex: /欧米茄烈炎/,
            beforeSeconds: -2,
            run: (data) => {
                PostNamazuMarkClear();
                delete data.towerBuff;
            },
        },
        {
            id: 'P2一运击退去中间',
            regex: /能量放出/,
            condition: (data) => !data.P5,
            beforeSeconds: 5,
            alertText: (data) => {
                if (data.P2一运名字[data.me][1] === '左') {
                    return `往左击退`;
                } else {
                    if (data.glitch === '远离') {
                        return `往右击退`;
                    } else {
                        return `往下击退`;
                    }
                }
            },
        },
        {
            id: 'P2一运分摊点名检测开',
            regex: /能量放出/,
            beforeSeconds: 10,
            run: (data) => {
                data.P2一运分摊点名检测 = true;
            },
        },
        {
            id: 'P2一运分摊点名检测关',
            regex: /能量放出/,
            beforeSeconds: 1,
            run: (data) => {
                data.P2一运分摊点名检测 = false;
            },
        },
        {
            id: 'P2二运躲箭',
            regex: /欧米茄射手天箭/,
            beforeSeconds: 6,
            alertText: (data) => {
                if (!data.party.isTank(data.me)) {
                    return '穿穿穿';
                }
            },
        },
        {
            id: 'P2.5标记取消',
            regex: /狙击式大功率波动炮/,
            beforeSeconds: -1,
            run: () => {
                PostNamazuMarkClear();
            },
        },
        {
            id: 'P5二运前半标记取消',
            regex: /清除记忆污染S x5/,
            beforeSeconds: 2,
            run: () => {
                PostNamazuMarkClear();
            },
        },
        {
            id: 'P5 死刑标禁止1',
            regex: /太阳射线 1/,
            beforeSeconds: 8,
            run: () => PostNamazuMarkClear()
        },
        {
            id: 'P5 死刑标禁止2',
            regex: /太阳射线 1/,
            beforeSeconds: 7,
            alertText: (data) => {
                if (data.party.isTank(data.me)) return
                return '死刑远离双T'
            },
            run: (data) => {
                if (!Mark.includes(5)) return
                let MT = data.职业位置.MT;
                let ST = data.职业位置.ST;
                let list = data.party.tankNames;
                if (nametocnjob(list[0], data) === MT) {
                    MT = list[0];
                    ST = list[1];
                } else {
                    ST = list[0];
                    MT = list[1];
                }
                PostNamazu('mark', {
                    Name: MT,
                    MarkType: 'stop1',
                    LocalOnly: onlyMeMarkP5,
                });
                PostNamazu('mark', {
                    Name: ST,
                    MarkType: 'stop2',
                    LocalOnly: onlyMeMarkP5,
                });
            },
        },
        {
            id: 'P5 死刑标禁止3',
            regex: /太阳射线 2/,
            beforeSeconds: -2,
            run: () => PostNamazuMarkClear()
        },
    ],
    triggers: [
        //P1

        {
            id: 'TOP Headmarker Tracker',
            type: 'HeadMarker',
            netRegex: {},
            condition: (data) => data.decOffset === undefined,
            // Unconditionally set the first headmarker here so that future triggers are conditional.
            run: (data, matches) => getHeadmarkerId(data, matches),
        },
        {
            id: 'TOP In Line Debuff',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({
                effectId: ['D80'],
                capture: true,
            }),
            delaySeconds: 0.2,
            condition: (data) => !data.P5,
            preRun: (data, matches) => {
                if (data.partJob === undefined) {
                    data.partJob = [];
                    for (let i = 0; i < 8; i++) {
                        let job = nametocnjob(
                            data.party.idToName_[data.party.partyIds_[i]],
                            data
                        );

                        data.partJob[i] = {
                            ID: data.party.partyIds_[i],
                            job: job,
                        };
                    }
                    //按照插件顺序排序
                    data.partJob.sort((a, b) => {
                        return (
                            shunxu.find((c) => c.job === a.job).order -
                            shunxu.find((c) => c.job === b.job).order
                        );
                    });
                    data.myJob = nametocnjob(data.me, data);
                    data.全能之主优先级 = data.partJob;
                    想要的优先级数组 = data.全能之主优先级;

                    for (let i = 0; i < 8; i++) {
                        data.职业优先级[data.全能之主优先级[i].job] = i;
                    }
                    data.职业位置 = {};
                    data.职业位置.H1 = Object.keys(data.职业优先级)[0];
                    data.职业位置.MT = Object.keys(data.职业优先级)[1];
                    data.职业位置.ST = Object.keys(data.职业优先级)[2];
                    data.职业位置.D1 = Object.keys(data.职业优先级)[3];
                    data.职业位置.D2 = Object.keys(data.职业优先级)[4];
                    data.职业位置.D3 = Object.keys(data.职业优先级)[5];
                    data.职业位置.D4 = Object.keys(data.职业优先级)[6];
                    data.职业位置.H2 = Object.keys(data.职业优先级)[7];
                    data._party = [];
                    for (let i of data.party.partyNames) {
                        let index = Object.values(data.职业位置).indexOf(nametocnjob(i, data));
                        data._party[index] = i;
                    }
                }
            },
            alertText: (data, matches, output) => {
                let time = parseFloat(matches.duration);

                if (data.towerBuff === undefined) data.towerBuff = [];
                let job = nametocnjob(matches.target, data);
                if (time < 20) {
                    data.towerBuff.push({
                        time: 1,
                        job: job,
                    });
                } else if (time < 30) {
                    data.towerBuff.push({
                        time: 2,
                        job: job,
                    });
                } else if (time < 40) {
                    data.towerBuff.push({
                        time: 3,
                        job: job,
                    });
                } else
                    data.towerBuff.push({
                        time: 4,
                        job: job,
                    });

                if (matches.target === data.me) {
                    data.我的次序 = data['inLine'][data.me];
                    for (let i in data['inLine']) {
                        if (data['inLine'][i] === data.我的次序 && i != data.me) {
                            data.同组职业 = nametocnjob(i, data);
                        }
                    }
                    if (
                        Number(data.职业优先级[data.myJob]) <
                        Number(data.职业优先级[data.同组职业])
                    ) {
                        data.优先级 = '大';
                    } else {
                        data.优先级 = '小';
                    }

                    //TTS
                    if (time < 20) {
                        return '第1次踩塔，优先级' + data.优先级;
                    } else if (time < 30) {
                        return '第2次踩塔，优先级' + data.优先级;
                    } else if (time < 40) {
                        return '第1次接线，优先级' + data.优先级;
                    } else return '第2次接线，优先级' + data.优先级;
                }
            },
            run: (data) => {
                delete data.partJob;
            },
        },
        {
            id: 'omega开场buff接线播报',
            type: 'GainsEffect',
            netRegex: NetRegexes.ability({
                id: ['7B08', '7B09'],
            }),
            preRun: (data, matches, output) => data.塔次数++,
            delaySeconds: 0.5,
            alertText: (data, matches, output) => {
                let myTime = data.towerBuff.find((i) => i.job === data.myJob).time;
                if (data.塔次数 === 1 && myTime === 4)
                    return '接线，优先级' + data.优先级;
                if (data.塔次数 === 2 && myTime === 1)
                    return '接线，优先级' + data.优先级;
                if (data.塔次数 === 3 && myTime === 2)
                    return '接线，优先级' + data.优先级;
            },
        },
        {
            id: 'TOP Program Loop Other Debuffs',
            type: 'Object',
            netRegex:
                /] ChatLog 00:0:101:.{8}:0005:(?<id>.{4}):1EB83D:E0000000:(?<x>.+?):(?<y>.+?):/,
            delaySeconds: 0.5,
            preRun: (data, matches) => {
                if (data.towerBuff) {
                    if (data.tower === undefined) data.tower = [];
                    let x = parseFloat(matches.x);
                    let y = parseFloat(matches.y);
                    let pos = Math.round(
                        Math.round(2 - (2 * Math.atan2(x - 100, y - 100)) / Math.PI) % 4
                    );
                    data.tower.push(pos);

                    let myTime = data.towerBuff.find((i) => i.job === data.myJob);
                    let 同组人 = data.towerBuff.find(
                        (i) => i.time === myTime.time && i.job != data.myJob
                    );
                    let 分组 = [myTime.job, 同组人.job];
                    // 分组.sort((a, b) => {
                    //   return shunxu.find((c) => c.job === a).order - shunxu.find((c) => c.job === b).order
                    // });
                    分组.sort((a, b) => {
                        return (
                            data.全能之主优先级.indexOf(
                                data.全能之主优先级.find((c) => c.job === a)
                            ) -
                            data.全能之主优先级.indexOf(
                                data.全能之主优先级.find((c) => c.job === b)
                            )
                        );
                    });
                    let 塔位置 = [];
                    let index = 分组.indexOf(data.myJob);
                    if (myTime.time === 1) {
                        if (data.tower.length >= 2) 塔位置 = [data.tower[0], data.tower[1]];
                    }
                    if (myTime.time === 2) {
                        if (data.tower.length >= 4) 塔位置 = [data.tower[2], data.tower[3]];
                    }
                    if (myTime.time === 3) {
                        if (data.tower.length >= 6) {
                            塔位置 = [data.tower[4], data.tower[5]];
                        }
                    }
                    if (myTime.time === 4) {
                        if (data.tower.length >= 8) 塔位置 = [data.tower[6], data.tower[7]];
                    }
                    if (塔位置.length >= 1) {
                        塔位置.sort();
                        data.bobaoIndex = 塔位置[index];
                    }
                }
            },
            alertText: (data, matches, output) => {
                let bobao = ['上', '右', '下', '左'];
                if (data.bobaoIndex !== undefined && !data.bobao) {
                    data.bobao = true;
                    let bobao1 = `踩${bobao[data.bobaoIndex]}塔`;
                    return bobao1;
                }
            },
        },
        {
            id: 'TOP In Line Debuff Cleanup',
            type: 'StartsUsing',
            // 7B03 = Program Loop
            // 7B0B = Pantokrator
            netRegex: {
                id: ['7B03', '7B0B'],
                capture: false,
            },
            // Don't clean up when the buff is lost, as that happens after taking a tower.
            run: (data) => (data.inLine = {}),
        },
        {
            id: 'TOP In Line Debuff Collector',
            type: 'GainsEffect',
            netRegex: {
                effectId: ['BBC', 'BBD', 'BBE', 'D7B'],
            },
            condition: (data) => !data.P5,
            delaySeconds: 0.1,
            preRun: (data, matches) => {
                const effectToNum = {
                    BBC: 1,
                    BBD: 2,
                    BBE: 3,
                    D7B: 4,
                };
                const num = effectToNum[matches.effectId];
                if (num === undefined) return;
                data.inLine[matches.target] = num;
            },
        },
        {
            id: '全能之主优先级播报',
            type: 'GainsEffect',
            netRegex: {
                effectId: ['BBC', 'BBD', 'BBE', 'D7B'],
            },
            delaySeconds: 0.1,
            condition: (data, matches, output) => data.bobaoIndex !== undefined,
            suppressSeconds: 10,
            alertText: (data, matches, output) => {
                const myNum = data.inLine[data.me];

                let 同组人 = Object.keys(data.inLine).find((i) => {
                    if (i === data.me) return false;
                    return data.inLine[i] === myNum;
                });
                let 同组人职业 = nametocnjob(同组人, data);
                let 点名一样 = [同组人职业, data.myJob];
                let abc = Object.keys(data.全能之主优先级);
                let ab = data.全能之主优先级.find((i) => i.job === '黑骑');
                let c = data.全能之主优先级.indexOf(ab);

                点名一样.sort((a, b) => {
                    return (
                        data.全能之主优先级.indexOf(
                            data.全能之主优先级.find((c) => c.job === a)
                        ) -
                        data.全能之主优先级.indexOf(
                            data.全能之主优先级.find((c) => c.job === b)
                        )
                    );
                });
                let index = 点名一样.indexOf(data.myJob);
                if (index === 0) return '去上半场 （右）';
                if (index === 1) return '去下半场 （左）';
            },
        },
        {
            id: 'TOP Pantokrator First Debuffs',
            type: 'StartsUsing',
            // 7B0D = initial Flame Thrower cast, 7E70 = later ones
            netRegex: {
                id: '7B0D',
            },
            suppressSeconds: 1,
            response: (data, _matches, output) => {
                // cactbot-builtin-response
                output.responseOutputStrings = {
                    lineStack: {
                        en: '',
                    },
                    spread: {
                        en: '1  (出去)',
                    },
                };
                const myNum = data.inLine[data.me];
                if (myNum === 1)
                    return {
                        alertText: output.spread(),
                    };
                return {
                    infoText: output.lineStack(),
                };
            },
        },
        {
            id: 'TOP Pantokrator Other Debuffs',
            type: 'Ability',
            // 7B0E = Guided Missile Kyrios spread damage
            netRegex: {
                id: '7B0E',
            },
            preRun: (data) => data.pantoMissileCount++,
            suppressSeconds: 1,
            response: (data, _matches, output) => {
                // cactbot-builtin-response
                output.responseOutputStrings = {
                    lineStack: {
                        en: '${num}',
                    },
                    spread: {
                        en: '${num} 出去',
                    },
                };
                const mechanicNum = data.pantoMissileCount + 1;
                if (mechanicNum >= 5) return;
                const myNum = data.inLine[data.me];
                if (myNum === mechanicNum)
                    return {
                        alertText: output.spread({
                            num: mechanicNum,
                        }),
                    };
                return {
                    infoText: output.lineStack({
                        num: mechanicNum,
                    }),
                };
            },
        },
        {
            id: 'TOP Program Loop First Debuffs',
            type: 'StartsUsing',
            // 7B07 = Blaster cast (only one cast, but 4 abilities)
            netRegex: {
                id: '7B07',
                capture: false,
            },
        },
        {
            id: 'TOP Diffuse Wave Cannon Kyrios',
            type: 'HeadMarker',
            netRegex: {},
            // We normally call this stuff out for other roles, but tanks often invuln this.
            suppressSeconds: 20,
            condition: (data) => data.P1,
            alertText: (data, matches, output) => {
                const id = getHeadmarkerId(data, matches);
                if (id === headmarkers.spread) {
                    if (data.role === 'tank') {
                        return output.tankCleaves();
                    } else {
                        return output.other();
                    }
                }
            },
            outputStrings: {
                tankCleaves: {
                    en: '坦克远离引导',
                },
                other: {
                    en: '分散，进目标圈引导',
                },
            },
        },
        {
            id: 'TOP Wave Cannon Kyrios',
            type: 'HeadMarker',
            netRegex: {},
            condition: false,
        },
        {
            id: 'TOP Solar Ray You',
            type: 'StartsUsing',
            netRegex: {
                id: ['7E6A', '7E6B'],
            },
            preRun: (data, matches) => data.solarRayTargets.push(matches.target),
            response: (data, matches, output) => {
                // cactbot-builtin-response
                output.responseOutputStrings = {
                    tankBusterOnYou: Outputs.tankBusterOnYou,
                    tankBusters: Outputs.tankBusters,
                };
                if (matches.target === data.me)
                    return {
                        alertText: output.tankBusterOnYou(),
                    };
                if (
                    data.solarRayTargets.length === 2 &&
                    !data.solarRayTargets.includes(data.me)
                )
                    return {
                        infoText: output.tankBusters(),
                    };
            },
        },

        //P2
        {
            id: 'P2 开始',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({id: '7B40', capture: false}),
            run: (data) => {
                data.P1 = undefined;
            },
        },

        {
            id: 'TOP Synergy Marker Collect',
            type: 'HeadMarker',
            netRegex: {},
            run: (data, matches) => {
                //P5二运红点名收集
                if (getHeadmarkerId(data, matches) === headmarkers.P5二运红点名) {
                    data.P5二运红点名.push(matches.target);
                    return;
                }
                //索尼收集
                const id = getHeadmarkerId(data, matches);
                const marker = playstationMarkerMap[id];
                if (marker === undefined) return;
                data.synergyMarker[matches.target] = marker;
            },
        },
        {
            id: 'TOP Mid Remote Glitch',
            type: 'GainsEffect',
            // D63 = Mid Glitch
            // D64 = Remote Glitch
            netRegex: {
                effectId: ['D63', 'D64'],
            },
            suppressSeconds: 10,
            run: (data, matches) =>
                (data.glitch = matches.effectId === 'D63' ? '靠近' : '远离'),
        },
        {
            id: 'TOP Synergy Marker',
            type: 'GainsEffect',
            // In practice, glitch1 glitch2 marker1 marker2 glitch3 glitch4 etc ordering.
            netRegex: {
                effectId: ['D63', 'D64'],
                capture: false,
            },
            condition: (data) => !data.P5,
            delaySeconds: 0.5,
            durationSeconds: 14,
            suppressSeconds: 10,
            infoText: (data, _matches, output) => {
                const glitch = data.glitch;
                data.P2一运名字 = {};

                function leftOrRight(name) {
                    let myMarker = data.synergyMarker[name];
                    //如果出现问题，至少在这里返回一些东西。
                    if (myMarker === undefined) return glitch;
                    let partner = 'unknown';
                    for (const [_name, _marker] of Object.entries(data.synergyMarker)) {
                        if (_marker === myMarker && _name !== name) {
                            partner = _name;
                            break;
                        }
                    }
                    let otherJob = nametocnjob(partner, data);
                    let myJOB = nametocnjob(name, data);
                    let 同组 = [myJOB, otherJob];
                    同组.sort((a, b) => {
                        return (
                            data.全能之主优先级.indexOf(
                                data.全能之主优先级.find((c) => c.job === a)
                            ) -
                            data.全能之主优先级.indexOf(
                                data.全能之主优先级.find((c) => c.job === b)
                            )
                        );
                    });
                    let index = 同组.indexOf(myJOB);
                    if (name === data.me) {
                        data.索尼同组人 = 同组;
                        data.myMarker = myMarker;
                    }
                    if (index === 0) {
                        return `左`;
                    }
                    if (index === 1) {
                        return `右`;
                    }
                }

                for (let i in data.synergyMarker) {
                    data.P2一运名字[i] = [data.synergyMarker[i], leftOrRight(i)];
                }

                return data.myMarker + ',去' + data.P2一运名字[data.me][1];
            },
            run: (data, _matches) => {
                if ((data.synergyMarker.length = 8)) {
                    function 去第几排(name) {
                        let _索尼;
                        let 左右 = data.P2一运名字[name][1];
                        if (data.glitch === '靠近' || 左右 === '左') {
                            switch (data.P2一运名字[name][0]) {
                                case '圆圈':
                                    _索尼 = 索尼.圆圈;
                                    break;
                                case '三角':
                                    _索尼 = 索尼.三角;
                                    break;
                                case '方块':
                                    _索尼 = 索尼.方块;
                                    break;
                                case '叉':
                                    _索尼 = 索尼.叉;
                                    break;

                                default:
                                    break;
                            }
                        }
                        if (data.glitch === '远离' && 左右 === '右') {
                            switch (data.P2一运名字[name][0]) {
                                case '圆圈':
                                    _索尼 = 索尼.倒_圆圈;
                                    break;
                                case '三角':
                                    _索尼 = 索尼.倒_三角;
                                    break;
                                case '方块':
                                    _索尼 = 索尼.倒_方块;
                                    break;
                                case '叉':
                                    _索尼 = 索尼.倒_叉;
                                    break;

                                default:
                                    break;
                            }
                        }
                        return _索尼;
                    }

                    function 给什么标记(name) {
                        let _标记;
                        let _左右 = data.P2一运名字[name][1];
                        let _排数 = data.P2一运名字[name][2];
                        if (_左右 === '左' && _排数 === '第一排') _标记 = P2一运标记.左1;
                        if (_左右 === '左' && _排数 === '第二排') _标记 = P2一运标记.左2;
                        if (_左右 === '左' && _排数 === '第三排') _标记 = P2一运标记.左3;
                        if (_左右 === '左' && _排数 === '第四排') _标记 = P2一运标记.左4;
                        if (_左右 === '右' && _排数 === '第一排') _标记 = P2一运标记.右1;
                        if (_左右 === '右' && _排数 === '第二排') _标记 = P2一运标记.右2;
                        if (_左右 === '右' && _排数 === '第三排') _标记 = P2一运标记.右3;
                        if (_左右 === '右' && _排数 === '第四排') _标记 = P2一运标记.右4;
                        return _标记;
                    }

                    for (let i in data.P2一运名字) {
                        data.P2一运名字[i].push(去第几排(i));
                        data.P2一运名字[i].push(给什么标记(i));
                    }

                    //标记
                    if (!Mark.includes(2)) return
                    for (let i in data.P2一运名字) {
                        PostNamazu('mark', {
                            Name: i,
                            MarkType: data.P2一运名字[i][3],
                            LocalOnly: onlyMeMarkP2,
                        });
                    }
                }
            },
        },
        {
            id: 'P2 一运画图男女组合技',
            type: 'ability',
            netRegex: NetRegexes.ability({
                id: '7B3E',
            }),
            delaySeconds: 5.5,
            promise: async (data, matches) => {
                const boss = await callOverlayHandler({
                    call: 'getCombatants',
                    names: 欧米茄F.concat(欧米茄M),
                });
                let F, M;
                for (let i in boss.combatants) {
                    if (欧米茄F.includes(boss.combatants[i].Name)) {
                        F = boss.combatants[i];
                    }
                }
                for (let i in boss.combatants) {
                    if (
                        欧米茄M.includes(boss.combatants[i].Name) &&
                        boss.combatants[i].ID === F.ID + 1
                    ) {
                        M = boss.combatants[i];
                    }
                }
                let skills = [];
                skills[0] = F.WeaponId === 0 ? '十字' : '辣翅';
                skills[1] = M.WeaponId === 0 ? '钢铁' : '月环';
                data.P2男女组合技FFD = [skills, F, M];
            },
            alertText: (data) => {
                let skills = data.P2男女组合技FFD[0];
                let re = skills[1] + skills[0];
                if (re === '钢铁十字') return '钢铁十字，远离男女';
                if (re === '月环辣翅') return '月环辣翅，靠近男的';
                if (re === '钢铁辣翅') return '钢铁辣翅，靠近女的';
                if (re === '月环十字') return '月环十字，男人两边';
            },
            // 	run: (data) => {
            // 		let skills = data.P2男女组合技FFD[0];
            // 		const 男人 = data.P2男女组合技FFD[2].ID;
            // 		const 女人 = data.P2男女组合技FFD[1].ID;
            // 		let json = {
            // 			钢铁: {
            // 				cmd: 'add_omen',
            // 				color: FFD.颜色,
            // 				shape_scale: {
            // 					key: 'circle',
            // 					range: 10.02,
            // 				},
            // 				pos: {
            // 					key: 'actor_pos',
            // 					id: 男人,
            // 				},
            // 				duration: 5,
            // 			},
            // 			月环: {
            // 				cmd: 'add_omen',
            // 				color: FFD.颜色,
            // 				shape_scale: {
            // 					key: 'donut',
            // 					range: 30,
            // 					inner: 10,
            // 				},
            // 				pos: {
            // 					key: 'actor_pos',
            // 					id: 男人,
            // 				},
            // 				duration: 5,
            // 			},
            // 			十字: {
            // 				cmd: 'add_omen',
            // 				color: FFD.颜色,
            // 				shape_scale: {
            // 					key: 'action_shape',
            // 					id: parseInt('7B2D', 16),
            // 				},
            // 				pos: {
            // 					key: 'actor_pos',
            // 					id: 女人,
            // 				},
            // 				facing: {
            // 					key: 'actor_relative_facing',
            // 					src: 女人,
            // 					dst: 男人,
            // 				},
            // 				duration: 5,
            // 			},
            // 		};

            // 		FFD.Send(json[skills[1]]);
            // 		if (skills[0] === '辣翅') {
            // 			FFD.send_feetfighter(data.P2男女组合技FFD[1], 50, 8, 40, 20, 5);
            // 		} else {
            // 			FFD.Send(json[skills[0]]);
            // 		}
            // 	},
        },
        // {
        // 	id: 'P2 一运画图眼睛激光',
        // 	type: 'ability',
        // 	netRegex: NetRegexes.ability({
        // 		id: '7B3E',
        // 	}),
        // 	delaySeconds: 10,
        // 	run: () => {
        // 		let json = {
        // 			cmd: 'foreach',
        // 			name: 'target_id',
        // 			values: { key: 'actors_by_base_id', id: 15716 },
        // 			func: {
        // 				cmd: 'add_omen',
        // 				color: 'nomal',
        // 				shape_scale: {
        // 					key: 'rect',
        // 					range: 65,
        // 					width: 16,
        // 				},
        // 				pos: {
        // 					key: 'actor_pos',
        // 					id: { key: 'arg', name: 'target_id' },
        // 				},
        // 				facing: {
        // 					key: 'actor_facing',
        // 					id: { key: 'arg', name: 'target_id' },
        // 				},
        // 				duration: 10,
        // 			},
        // 		};
        // 		let json2 = {
        // 			cmd: 'foreach',
        // 			name: 'target_id',
        // 			values: { key: 'actors_by_base_id', id: 15716 },
        // 			func: {
        // 				cmd: 'add_omen',
        // 				color: 'hard',
        // 				shape_scale: {
        // 					key: 'rect',
        // 					range: 35,
        // 					width: 16,
        // 				},
        // 				pos: {
        // 					key: 'actor_pos',
        // 					id: { key: 'arg', name: 'target_id' },
        // 				},
        // 				facing: {
        // 					key: 'actor_facing',
        // 					id: { key: 'arg', name: 'target_id' },
        // 				},
        // 				duration: 10,
        // 			},
        // 		};
        // 		FFD.Send(json);
        // 		FFD.Send(json2);
        // 	},
        // },
        {
            id: 'TOP Spotlight',
            type: 'HeadMarker',
            netRegex: {},
            condition: (data) => !data.P5,
            preRun: (data, matches) => {
                const id = getHeadmarkerId(data, matches);
                if (id === headmarkers.stack) {
                    let job = nametocnjob(matches.target, data);
                    data.spotlightStacks.push(job);
                }
            },
            response: (data, _matches, output) => {
                // cactbot-builtin-response

                const glitch = data.glitch;
                let 分摊人 = data.spotlightStacks.sort((a, b) => {
                    return (
                        data.全能之主优先级.indexOf(
                            data.全能之主优先级.find((c) => c.job === a)
                        ) -
                        data.全能之主优先级.indexOf(
                            data.全能之主优先级.find((c) => c.job === b)
                        )
                    );
                });
                if (data.spotlightStacks.length === 2) {
                    if (分摊人 === data.索尼同组人 && data.glitch === '远离')
                        return '换位后左右击退';
                    if (分摊人 === data.索尼同组人 && data.glitch === '靠近')
                        return '换位后左下击退';
                    if (data.glitch === '远离') return '左右击退';
                    if (data.glitch === '靠近') return '左下击退';
                }
            },
        },
        {
            id: 'TOP Optimized Meteor',
            type: 'HeadMarker',
            disabled: true,
            netRegex: {},
            condition: Conditions.targetIsYou(),
        },
        {
            id: 'TOP Beyond Defense',
            disabled: true,
            type: 'Ability',
            netRegex: {
                id: '7B28',
            },
            //condition: Conditions.targetIsYou(),
        },
        {
            id: 'TOP Party Synergy',
            type: 'Ability',
            netRegex: {
                id: '7B3E',
                source: 'Omega',
                capture: false,
            },
            // Untargetable 3s after this, things appear ~2 after this, 2.5 for safety.
            condition: false,
        },
        {
            id: '欧密茄索尼位置播报',
            type: 'Ability',
            netRegex: NetRegexes.ability({
                id: ['7B2D', '7B26', '7B2D', '7B2A'],
            }),
            suppressSeconds: 999,
            alertText: (data, matches, output) => {
                let a = 0;
                if (data.P2一运名字[data.me][2] === '第一排') a = 1;
                if (data.P2一运名字[data.me][2] === '第二排') a = 2;
                if (data.P2一运名字[data.me][2] === '第三排') a = 3;
                if (data.P2一运名字[data.me][2] === '第四排') a = 4;

                return `${data.P2一运名字[data.me][1]}${a}，${data.glitch}`;
            },
        },
        {
            id: 'P2 一运击退换组提示',
            type: 'HeadMarker',
            netRegex: NetRegexes.headMarker(),
            condition: (data, matches) => data.P2一运分摊点名检测,
            preRun: (data, matches) => {
                data.一运击退换组.push(matches.target);
            },
            run: (data) => {
                if (data.一运击退换组.length === 2) {
                    //如果同边
                    let name1 = data.一运击退换组[0];
                    let name2 = data.一运击退换组[1];
                    if (data.P2一运名字[name1][1] === data.P2一运名字[name2][1]) {
                        let a1 = 0;
                        let a2 = 0;
                        if (data.P2一运名字[name1][2] === '第一排') a1 = 1;
                        if (data.P2一运名字[name1][2] === '第二排') a1 = 2;
                        if (data.P2一运名字[name1][2] === '第三排') a1 = 3;
                        if (data.P2一运名字[name1][2] === '第四排') a1 = 4;
                        if (data.P2一运名字[name2][2] === '第一排') a2 = 1;
                        if (data.P2一运名字[name2][2] === '第二排') a2 = 2;
                        if (data.P2一运名字[name2][2] === '第三排') a2 = 3;
                        if (data.P2一运名字[name2][2] === '第四排') a2 = 4;
                        //分析要换位的图形
                        let move = '';
                        if (a1 > a2) {
                            move = data.P2一运名字[name1][0];
                        } else {
                            move = data.P2一运名字[name2][0];
                        }
                        //看自己是哪一组
                        if (data.P2一运名字[data.me][0] === move) {
                            if (data.P2一运名字[data.me][1] === '左') {
                                data.P2一运名字[data.me][1] = '右';
                            } else {
                                data.P2一运名字[data.me][1] = '左';
                            }
                        }
                    }
                }
            },
        },
        {
            id: '二运开始',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: '7B38',
                capture: false,
            }),
            run: (data, matches) => {
                data.二运 = true;
            },
            alertText: (data, matches, output) => {
                if (data.role === 'tank') return '准备接线';
                if (data.role !== 'tank') return '集合引导';
            },
        },
        {
            id: 'P2二运标记双T',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: ['7B33'],
                capture: false,
            }),
            run: (data) => {
                if (!Mark.includes(2)) return
                let MT = data.职业位置.MT;
                let ST = data.职业位置.ST;
                let list = data.party.tankNames;
                if (nametocnjob(list[0], data) === MT) {
                    MT = list[0];
                    ST = list[1];
                } else {
                    ST = list[0];
                    MT = list[1];
                }
                PostNamazu('mark', {
                    Name: MT,
                    MarkType: 'stop1',
                    LocalOnly: onlyMeMarkP2_2,
                });
                PostNamazu('mark', {
                    Name: ST,
                    MarkType: 'stop2',
                    LocalOnly: onlyMeMarkP2_2,
                });
            },
        },
        {
            id: 'P2二运splatoon投盾男',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: ['7B33'],
                capture: false,
            }),
            delaySeconds: 8,
            run: () => {
                let namespace = '投盾男';
                let time = '15000';
                let json = `{
          "Name": "二运M位置",
          "type": 1,
          "radius": 3.0,
          "color": 4278190335,
          "overlayBGColor": 3355443200,
          "overlayTextColor": 4290903808,
          "overlayVOffset": 2.0,
          "overlayFScale": 3.0,
          "thicc": 5.0,
          "refActorDataID": 15714,
          "refActorPlaceholder": [],
          "refActorComparisonAnd": true,
          "FillStep": 0.1,
          "refActorComparisonType": 7,
          "onlyVisible": true,
          "tether": true,
          "DistanceSourceX": 100.11486,
          "DistanceSourceY": 88.17513,
          "DistanceSourceZ": -5.456968E-12,
          "DistanceMax": 5.0,
          "refActorVFXPath": "vfx/common/eff/mon_eisyo03t.avfx",
          "refActorVFXMax": 999000
        }`;
                Splatoon(namespace, time, json);
            },
        },
        {
            id: '二运开始结束',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: ['7B38'],
                capture: false,
            }),
            delaySeconds: 15,
            run: (data, matches) => {
                data.二运 = false;
            },
        },
        {
            id: '欧密茄二运连线',
            type: 'Tether',
            netRegex: NetRegexes.tether({
                id: '0054',
            }),
            promise: async (data, matches) => {
                const boss = await callOverlayHandler({
                    call: 'getCombatants',
                    ids: [parseInt(matches.sourceId, 16)],
                });
                let 二运boss = boss.combatants[0];
                if (data.linePos === undefined) data.linePos = [];
                let pos = Math.round(
                    Math.round(
                        4 -
                        (4 * Math.atan2(二运boss.PosX - 100, 二运boss.PosY - 100)) /
                        Math.PI
                    ) % 8
                );
                data.linePos.push(pos);
            },
            alertText: (data, matches) => {
                if (data.linePos.length === 2) {
                    data.linePos.sort();
                    let bobao = ['上', '右上', '右', '右下', '下', '左下', '左', '左上'];
                    let myRoleInparty = data.全能之主优先级.findIndex(
                        (i) => i.job === data.myJob
                    );
                    //是mt
                    if (myRoleInparty === 1) return `去${bobao[data.linePos[0]]}接线`;
                    //是st
                    if (myRoleInparty === 2) return `去${bobao[data.linePos[1]]}接线`;
                }
            },
        },
        {
            id: 'P2狂暴倒计时',
            ttype: 'ability',
            netRegex: NetRegexes.ability({
                id: ['7B22'],
                capture: false,
            }),
            delaySeconds: 7.6,
            run: (data) => {
                data.P3 = true;
                PostNamazuMarkClear(); //二运标记清除
                if (P2PostNamazu) {
                    PostNamazu('queue', [
                        {
                            c: 'command',
                            p: '/p 离狂暴还有20秒 <se.1>',
                        },
                        {
                            c: 'command',
                            p: '/p 离狂暴还有10秒 <se.1>',
                            d: 10 * 1000,
                        },
                        {
                            c: 'command',
                            p: '/p 离狂暴还有9秒 <se.1>',
                            d: 1000,
                        },
                        {
                            c: 'command',
                            p: '/p 离狂暴还有8秒 <se.1>',
                            d: 1000,
                        },
                        {
                            c: 'command',
                            p: '/p 离狂暴还有7秒 <se.1>',
                            d: 1000,
                        },
                        {
                            c: 'command',
                            p: '/p 离狂暴还有6秒 <se.1>',
                            d: 1000,
                        },
                        {
                            c: 'command',
                            p: '/p 离狂暴还有5秒 <se.1>',
                            d: 1000,
                        },
                        {
                            c: 'command',
                            p: '/p 离狂暴还有4秒 <se.1>',
                            d: 1000,
                        },
                        {
                            c: 'command',
                            p: '/p 离狂暴还有3秒 <se.1>',
                            d: 1000,
                        },
                        {
                            c: 'command',
                            p: '/p 离狂暴还有2秒 <se.1>',
                            d: 1000,
                        },
                        {
                            c: 'command',
                            p: '/p 离狂暴还有1秒 <se.1>',
                            d: 1000,
                        },
                    ]);
                }
            },
        },

        //p3
        {
            id: '欧密茄p2.5bu标记清除',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({
                effectId: ['D61', 'D62'],
                capture: true,
            }),
            suppressSeconds: 26,
            delaySeconds: 26,
            run: (data) => {
                PostNamazuMarkClear();
                //删除前2P的变量
                data.P1全能之主 = undefined;
                data.solarRayTargets = undefined;
                data.inLine = undefined;
                data.synergyMarker = {};
                data.cannonFodder = undefined;
                data.塔次数 = undefined;
                data.一运击退换组 = undefined;
                data.P2一运分摊点名检测 = undefined;
                data.我的次序 = undefined;
                data.同组职业 = undefined;
                data.优先级 = undefined;
                data.P1分组 = undefined;
                data.tower = undefined;
                data.变身Boss = undefined;
                data.glitch = undefined;
                data.P2一运名字 = undefined;
                data.索尼同组人 = undefined;
            },
        },
        {
            id: '欧密茄p2.5buff',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({
                effectId: ['D61', 'D62'],
                capture: true,
            }),
            alertText: (data, matches) => {
                let name = matches.target;
                //分散
                if (matches.effectId === 'D61') {
                    if (data.P2_5分散人 === undefined) data.P2_5分散人 = [];
                    data.P2_5分散人.push(name);
                }
                //分摊
                if (matches.effectId === 'D62') {
                    if (data.P2_5分摊人 === undefined) data.P2_5分摊人 = [];
                    data.P2_5分摊人.push(name);
                }
                if (data.P2_5分散人.length === 4 && data.P2_5分摊人.length === 2) {
                    function 职业优先级排序(a, b) {
                        let jobA = nametocnjob(a, data);
                        let jobB = nametocnjob(b, data);
                        return data.职业优先级[jobA] - data.职业优先级[jobB];
                    }

                    //点名分散
                    data.P2_5分散人.sort(职业优先级排序);

                    //点名分摊
                    data.P2_5分摊人.sort(职业优先级排序);

                    //无点名分摊
                    let 所有人 = Object.keys(data.inLine);
                    data.P2_5无点名 = 所有人.filter(
                        (a) =>
                            data.P2_5分散人.indexOf(a) === -1 &&
                            data.P2_5分摊人.indexOf(a) === -1
                    );

                    //自己
                    if (data.me === data.P2_5分散人[0]) return '左边分散';
                    if (data.me === data.P2_5分散人[1]) return '左下分散';
                    if (data.me === data.P2_5分散人[2]) return '右下分散';
                    if (data.me === data.P2_5分散人[3]) return '右边分散';
                    if (data.me === data.P2_5分摊人[0] || data.me === data.P2_5无点名[0])
                        return '左上分摊';
                    if (data.me === data.P2_5分摊人[1] || data.me === data.P2_5无点名[1])
                        return '右上分摊';
                }
            },
            //标记
            run: (data, matches) => {
                if (!Mark.includes(3)) return
                if (data.P2_5分散人.length === 4 && data.P2_5分摊人.length === 2) {
                    PostNamazu('mark', {
                        Name: data.P2_5分散人[0],
                        MarkType: `attack1`,
                        LocalOnly: onlyMeMarkP2_5,
                    });
                    PostNamazu('mark', {
                        Name: data.P2_5分散人[1],
                        MarkType: `attack2`,
                        LocalOnly: onlyMeMarkP2_5,
                    });
                    PostNamazu('mark', {
                        Name: data.P2_5分散人[2],
                        MarkType: `attack3`,
                        LocalOnly: onlyMeMarkP2_5,
                    });
                    PostNamazu('mark', {
                        Name: data.P2_5分散人[3],
                        MarkType: `attack4`,
                        LocalOnly: onlyMeMarkP2_5,
                    });

                    PostNamazu('mark', {
                        Name: data.P2_5分摊人[0],
                        MarkType: `bind1`,
                        LocalOnly: onlyMeMarkP2_5,
                    });
                    PostNamazu('mark', {
                        Name: data.P2_5分摊人[1],
                        MarkType: `bind2`,
                        LocalOnly: onlyMeMarkP2_5,
                    });
                    PostNamazu('mark', {
                        Name: data.P2_5无点名[0],
                        MarkType: `stop1`,
                        LocalOnly: onlyMeMarkP2_5,
                    });
                    PostNamazu('mark', {
                        Name: data.P2_5无点名[1],
                        MarkType: `stop2`,
                        LocalOnly: onlyMeMarkP2_5,
                    });
                }
            },
        },
        {
            id: 'P2.5手臂画图',
            netRegex: /] ChatLog 00:0:106:(?<id>[0-9A-F]{8}):[^:]*:0197:[^:]{4}:00001E4(4|3):/,
            condition: (data) => data.P3,
            preRun: (data, matches) => {
                if (data.P3手臂次数 < 3) {
                    let namespace = `P2.5手臂`;
                    let time = '12000';
                    let json = `{
						"Name": "",
						"type": 1,
						"radius": 11.0,
						"color": 839160063,
						"refActorObjectID": ${parseInt(matches.id, 16)},
						"refActorComparisonType": 2,
						"onlyVisible": true,
						"Filled": true
					}`;
                    Splatoon(namespace, time, json);
                }
            },
            run: (data) => {
                data.P3手臂次数++;
            },
        },
        //HW专场

        //  DC7 蓝DNA：吃到大圈解除。 27.00
        //  DAF 绿线，和上面必定同时在一起 23.00

        //  DC6 红毒，去踩红塔 27.00   D6E
        //  D65 蓝毒，去踩蓝塔 27.00   D6F
        //  DC5 大圈 21.00   D6D
        //  DC4 分摊 21.00   D6C

        //  D71 蓝线，分摊后拉远 23.00（必须是23.00秒的才是第一组）

        //判定时间为hw读条结束后五秒开始算
        {
            id: 'P3HW 拉线BUFF收集',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({
                effectId: ['DAF', 'D71'],
                capture: true,
            }),
            run: (data, matches) => {
                switch (matches.effectId) {
                    case 'DAF':
                        if (matches.duration === '23.00')
                            data.smellRot[matches.target] = '绿线';
                        break;
                    case 'D71':
                        if (matches.duration === '23.00')
                            data.smellRot[matches.target] = '蓝线';
                        break;
                }
            },
        },
        {
            id: 'TOP Code Smell Collector',
            type: 'GainsEffect',
            // D6C Synchronization Code Smell (stack)
            // D6D Overflow Code Smell (defamation)
            // D6E Underflow Code Smell (red)
            // D6F Performance Code Smell (blue)
            // D71 Remote Code Smell (far tethers)
            // DAF Local Code Smell (near tethers)
            // DC9 Local Regression (near tethers)
            // DCA Remote Regression (far tethers)
            // DC4 Critical Synchronization Bug (stack)
            // DC5 Critical Overflow Bug (defamation)
            // DC6 Critical Underflow Bug (red)
            // D65 Critical Performance Bug (blue)
            netRegex: {
                effectId: ['D6D', 'D6E', 'D6F'],
            },
            run: (data, matches) => {
                const isDefamation = matches.effectId === 'D6D';
                const isRed = matches.effectId === 'D6E';
                const isBlue = matches.effectId === 'D6F';
                if (isDefamation) data.smellDefamation.push(matches.target);
                else if (isRed) data.smellRot[matches.target] = 'red';
                else if (isBlue) data.smellRot[matches.target] = 'blue';
            },
        },
        {
            id: 'TOP Sniper Cannon Fodder',
            type: 'GainsEffect',
            netRegex: {
                effectId: 'D61',
            },
            disabled: true,
        },
        {
            id: 'TOP High-Powered Sniper Cannon Fodder Collect',
            type: 'GainsEffect',
            netRegex: {
                effectId: 'D62',
            },
            disabled: true,
        },
        {
            id: 'TOP High-Powered Sniper Cannon Fodder',
            type: 'GainsEffect',
            netRegex: {
                effectId: 'D62',
                capture: false,
            },
            disabled: true,
        },
        {
            id: 'TOP Rot Pass/Get',
            type: 'Ability',
            // 7B5F Cascading Latent Defect (Red Tower)
            // 7B60 Latent Performance Defect (Blue Tower)
            // These casts go off 1 second after Latent Defect and go off regardless if someone soaks it
            netRegex: {id: ['7B5F', '7B60'], source: 'Omega', capture: false},
            disabled: true,
        },
        {
            id: 'TOP P3 Second Regression Break Tether',
            type: 'GainsEffect',
            // DC9 Local Regression (red/green)
            // DCA Remote Regression (blue)
            // Debuffs last 10s
            // Ideally first patch that breaks is blue, else this will not work
            // Will call out if has not broken yet and it is safe to break, if by end
            // of delay and first tether has not broken, it will not call
            netRegex: {effectId: ['DC9', 'DCA']},
            disabled: true,
        },
        {
            id: 'TOP Latent Defect Tower',
            type: 'StartsUsing',
            netRegex: {id: '7B6F', source: 'Omega', capture: false},
            disabled: true,
        },
        {
            id: 'TOP Latent Defect Tether Towers',
            type: 'GainsEffect',
            // D71 Remote Code Smell (blue)
            // DAF Local Code Smell(red/green)
            // Using Code Smell as the regressions come ~8.75s after Latent Defect
            // Debuffs are 23, 44, 65, and 86s
            // TODO: Possibly include direction?
            netRegex: {effectId: ['D71', 'DAF']},
            disabled: true,
        },
        {
            id: 'TOP Rot Spread',
            type: 'GainsEffect',
            // D65 Critical Performance Bug (blue)
            // DC6 Critical Underflow Bug (red)
            // Debuffs last 27s
            netRegex: {effectId: ['D65', 'DC6']},
            // TODO: should we have a "Watch Rot" call if you don't get it?
            // (with some suppression due to inconsistent rot pickup timings etc)
            disabled: true,
        },
        {
            id: 'TOP Code Smell Defamation Color',
            type: 'GainsEffect',
            netRegex: {
                effectId: 'D6D',
                capture: false,
            },
            delaySeconds: 0.5,
            suppressSeconds: 1,
            durationSeconds: 103,
            alarmText: (data, _matches, output) => {
                let rotColor;
                if (data.smellDefamation.length !== 2) {
                    console.error(
                        `Defamation: missing person: ${JSON.stringify(
                            data.smellDefamation
                        )}, ${JSON.stringify(data.smellRot)}`
                    );
                }
                for (const target of data.smellDefamation) {
                    const color = data.smellRot[target];
                    if (color === undefined) {
                        console.error(
                            `Defamation: missing color: ${JSON.stringify(
                                data.smellDefamation
                            )}, ${JSON.stringify(data.smellRot)}`
                        );
                        continue;
                    }
                    if (rotColor === undefined) {
                        rotColor = color;
                        continue;
                    }
                    if (rotColor !== color) {
                        console.error(
                            `Defamation: conflicting color: ${JSON.stringify(
                                data.smellDefamation
                            )}, ${JSON.stringify(data.smellRot)}`
                        );
                        rotColor = undefined;
                        break;
                    }
                }
                data.defamationColor = rotColor;
                if (rotColor === 'red') {
                    data.P3HW大圈塔 = '红';
                    data.P3HW分摊塔 = '蓝';
                    if (P3PostNamazu1) PostNamazu('command', '大圈红色red，分摊蓝色blue');
                    return output.red();
                } else if (rotColor === 'blue') {
                    data.P3HW大圈塔 = '蓝';
                    data.P3HW分摊塔 = '红';
                    if (P3PostNamazu1) PostNamazu('command', '大圈蓝色blue，分摊红色red');
                    return output.blue();
                }
                return output.unknown();
            },
            outputStrings: {
                red: {
                    en: 'Red Defamation',
                    de: 'Rote Ehrenstrafe',
                    ko: '빨강 광역',
                    cn: '大圈红色，分摊蓝色',
                },
                blue: {
                    en: 'Blue Defamation',
                    de: 'Blaue Ehrenstrafe',
                    ko: '파랑 광역',
                    cn: '大圈蓝色，分摊红色',
                },
                unknown: {
                    en: '??? Defamation',
                    de: '??? Ehrenstrafe',
                    ko: '??? 광역',
                },
            },
        },
        {
            id: '优先级',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: '7B55',
            }),
            delaySeconds: 8,
            durationSeconds: 102,
            infoText: (data, matches) => {
                let 我的点名 = data.smellRot[data.me];
                let 同组人;
                for (let i in data.smellRot) {
                    if (i != data.me && data.smellRot[i] === 我的点名) 同组人 = i;
                }
                同组人 = nametocnjob(同组人, data);
                if (data.职业优先级[同组人] < data.职业优先级[data.myJob]) {
                    return '优先级小';
                } else {
                    return '优先级大';
                }
            },
            run: (data) => {
                data.HW1 = [
                    `踩${data.P3HW大圈塔}塔放大圈`,
                    `靠近${data.P3HW分摊塔}塔吃分摊`,
                    `踩${data.P3HW分摊塔}塔放分摊`,
                    `靠近${data.P3HW大圈塔}塔吃大圈`,
                ];
                data.HW2 = ['', `接毒，然后拉远线`, '', `接毒，然后拉近线`];
                let myBuff = data.smellRot[data.me];
                let isBig = data.smellDefamation.includes(data.me);
                if (isBig) data.P3HWtts = 1;
                if (!isBig) data.P3HWtts = 3;
                if (myBuff === '绿线') data.P3HWtts = 4;
                if (myBuff === '蓝线') data.P3HWtts = 2;
            },
        },

        {
            id: 'P3 HW第一轮播报',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: '7B55',
            }), //你好世界读条开始
            delaySeconds: 11,
            durationSeconds: 15,
            alertText: (data) => {
                //第一轮1
                return data.HW1[data.P3HWtts - 1];
            },
        },
        {
            id: 'P3 HW传毒拉线播报',
            type: 'ability',
            netRegex: NetRegexes.ability({
                id: '7B6F',
            }), //潜在错误读条结束
            durationSeconds: 10,
            alertText: (data) => {
                if (data.P3HW轮次 === 1) {
                    //第一轮2
                    return data.HW2[data.P3HWtts - 1];
                }
                if (data.P3HW轮次 === 2) {
                    //第二轮2
                    let num = ((data.P3HWtts + (2 - 1)) % 4) - 1;
                    if (num < 0) num = num + 4;
                    return data.HW2[num];
                }
                if (data.P3HW轮次 === 3) {
                    //第三轮2
                    let num = ((data.P3HWtts + (3 - 1)) % 4) - 1;
                    if (num < 0) num = num + 4;
                    return data.HW2[num];
                }
                if (data.P3HW轮次 === 4) {
                    //第四轮2
                    return 'Hello Word 结束';
                }
            },
            run: (data) => data.P3HW轮次++,
        },
        {
            id: 'P3 HW踩塔播报',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: '7B6F',
            }),
            durationSeconds: 15,
            alertText: (data) => {
                if (data.P3HW轮次 === 2) {
                    //第二轮1
                    let num = ((data.P3HWtts + (2 - 1)) % 4) - 1;
                    if (num < 0) num = num + 4;
                    return data.HW1[num];
                }
                if (data.P3HW轮次 === 3) {
                    //第三轮1
                    let num = ((data.P3HWtts + (3 - 1)) % 4) - 1;
                    if (num < 0) num = num + 4;
                    return data.HW1[num];
                }
                if (data.P3HW轮次 === 4) {
                    //第四轮1
                    let num = ((data.P3HWtts + (4 - 1)) % 4) - 1;
                    if (num < 0) num = num + 4;
                    if (num === 3) {
                        return `最后一轮靠近${data.P3HW分摊塔}塔`;
                    }
                    return data.HW1[num];
                }
            },
        },
        {
            id: 'P3 小电视点名标记',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({
                effectId: ['D7D', 'D7C'],
                capture: true,
            }),
            durationSeconds: 5,
            condition: (data) => !data.P5 && P3TV === 1,
            preRun: (data, matches) => {
                data.P3小电视点名.push(matches.target);
            },
            alertText: (data) => {
                //报位置
                if (data.P3小电视点名.length === 3) {
                    data.P3小电视站位 = {};
                    data.P3小电视站位.左2 = data.职业位置.D3;
                    data.P3小电视站位.左1 = data.职业位置.D1;
                    data.P3小电视站位.右1 = data.职业位置.D2;
                    data.P3小电视站位.右2 = data.职业位置.D4;
                    data.P3小电视站位.上2 = data.职业位置.H1;
                    data.P3小电视站位.上1 = data.职业位置.MT;
                    data.P3小电视站位.下1 = data.职业位置.ST;
                    data.P3小电视站位.下2 = data.职业位置.H2;
                    //交换顺序
                    let 左2 = data.P3小电视站位.左2;
                    let 左1 = data.P3小电视站位.左1;
                    let 右1 = data.P3小电视站位.右1;
                    let 右2 = data.P3小电视站位.右2;
                    let 上2 = data.P3小电视站位.上2;
                    let 上1 = data.P3小电视站位.上1;
                    let 下1 = data.P3小电视站位.下1;
                    let 下2 = data.P3小电视站位.下2;
                    let temp = [
                        [左2, 上2],
                        [左1, 上1],
                        [右1, 下1],
                        [右2, 下2],
                    ];
                    let 点名3人组 = [
                        nametocnjob(data.P3小电视点名[0], data),
                        nametocnjob(data.P3小电视点名[1], data),
                        nametocnjob(data.P3小电视点名[2], data),
                    ];
                    let temp2 = [temp[0][1], temp[1][1], temp[2][1], temp[3][1]]; //下面组
                    let 交集 = temp2.filter((value) => 点名3人组.includes(value)); //下面组有几个点名
                    if (交集.length > 1) {
                        //如果下面组人数>1
                        for (let i = 0; i < 4; i++) {
                            let _temp2 = [temp[0][1], temp[1][1], temp[2][1], temp[3][1]]; //下面组
                            let _交集 = _temp2.filter((value) => 点名3人组.includes(value)); //下面组有几个点名
                            if (_交集.length > 1) {
                                //如果下面组人数>1
                                if (
                                    //当前组里上下点名数量
                                    temp[i].filter((value) => 点名3人组.includes(value)).length === 1
                                ) {
                                    //如果当前上下组里有一个点名
                                    if (!点名3人组.includes(temp[i][0])) {
                                        //如果同组上面有点名则不换
                                        temp[i].reverse();
                                    }
                                }
                            } else break;
                        }
                    } else {
                        if (交集.length < 1) {
                            //如果下面组人数为0
                            for (let i = 3; i >= 0; i--) {
                                if (
                                    temp[i].filter((value) => 点名3人组.includes(value)).length === 1
                                ) {
                                    //如果当前上下组里有一个点名
                                    temp[i].reverse();
                                    break;
                                }
                            }
                        }
                    }
                    //
                    data.P3小电视补充 = '';
                    let ppp = [temp[0][0], temp[1][0], temp[2][0], temp[3][0]];
                    if (ppp.includes(data.myJob)) {
                        ppp = ppp.filter((value) => 点名3人组.includes(value));
                        if (ppp[0] === data.myJob) {
                            data.P3小电视补充 = '往上放';
                        }
                        if (ppp[1] === data.myJob) {
                            data.P3小电视补充 = '往下放';
                        }
                    }
                    data.P3点名3人组 = 点名3人组;
                    //
                    data.P3小电视站位.左2 = temp[0][0];
                    data.P3小电视站位.左1 = temp[1][0];
                    data.P3小电视站位.右1 = temp[2][0];
                    data.P3小电视站位.右2 = temp[3][0];
                    data.P3小电视站位.上2 = temp[0][1];
                    data.P3小电视站位.上1 = temp[1][1];
                    data.P3小电视站位.下1 = temp[2][1];
                    data.P3小电视站位.下2 = temp[3][1];
                    console.log(data.P3小电视站位);
                    for (let i in data.P3小电视站位) {
                        if (data.P3小电视站位[i] === data.myJob) {
                            if (i === '左2') return `横排第1`;
                            if (i === '左1') return `横排第2`;
                            if (i === '右1') return `横排第3`;
                            if (i === '右2') return `横排第4`;
                            if (i === '上2') return `竖排第1`;
                            if (i === '上1') return `竖排第2`;
                            if (i === '下1') return `竖排第3`;
                            if (i === '下2') return `竖排第4`;
                        }
                    }
                }
            },
            run: (data) => {
                if (data.P3小电视点名.length === 3) {
                    //标记
                    if (useMark) {
                        if (!Mark.includes(3)) return
                        PostNamazu('queue', [
                            {
                                c: 'mark',
                                p: JSON.stringify({
                                    Name: data.P3小电视点名[0],
                                    MarkType: `attack1`,
                                    LocalOnly: onlyMeMarkP3,
                                }),
                            },
                            {
                                c: 'mark',
                                p: JSON.stringify({
                                    Name: data.P3小电视点名[1],
                                    MarkType: `attack2`,
                                    LocalOnly: onlyMeMarkP3,
                                }),
                                d: 100,
                            },
                            {
                                c: 'mark',
                                p: JSON.stringify({
                                    Name: data.P3小电视点名[2],
                                    MarkType: `attack3`,
                                    LocalOnly: onlyMeMarkP3,
                                }),
                                d: 100,
                            },
                        ]);
                    }
                    if (P3PostNamazu) {
                        PostNamazu('queue', [
                            {
                                c: 'command',
                                p: `/p                   ${data.P3小电视站位.上2}           `,
                                d: 100,
                            },
                            {
                                c: 'command',
                                p: `/p                   ${data.P3小电视站位.上1}           `,
                            },
                            {
                                c: 'command',
                                p: `/p  ${data.P3小电视站位.左2}   ${data.P3小电视站位.左1}     ${data.P3小电视站位.右1}    ${data.P3小电视站位.右2}`,
                            },
                            {
                                c: 'command',
                                p: `/p                   ${data.P3小电视站位.下1}           `,
                            },
                            {
                                c: 'command',
                                p: `/p                   ${data.P3小电视站位.下2}           `,
                            },
                        ]);
                    }
                }
            },
        },
        {
            id: 'P3 小电视背对面朝',
            type: 'GainsEffect',
            // D7C = Oversampled Wave Cannon Loading (facing right)
            // D7D = Oversampled Wave Cannon Loading (facing left)
            netRegex: {effectId: ['D7C', 'D7D'], capture: true},
            condition: (data, matches) => {
                return data.me === matches.target && !data.P5 && P3TV === 1;
            },
            delaySeconds: 2,
            durationSeconds: 5,
            infoText: (data, matches) => {
                let boss = data.P3BOSS电视; // '右' || '左'
                let 结果 = data.P3小电视补充; // '往上放' || '往下放'
                let 自己 = matches.effectId === 'D7C' ? '右' : '左';
                let re = '';
                //横排左
                if (
                    [data.P3小电视站位.左2, data.P3小电视站位.左1].includes(data.myJob)
                ) {
                    if (
                        (结果 === '往上放' && 自己 === '右') ||
                        (结果 === '往下放' && 自己 === '左')
                    ) {
                        re = `背对BOSS，然后向${自己}走一步`;
                    } else re = `面朝BOSS，然后向${自己}走一步`;
                }
                //横排右
                if (
                    [data.P3小电视站位.右2, data.P3小电视站位.右1].includes(data.myJob)
                ) {
                    if (
                        (结果 === '往上放' && 自己 === '右') ||
                        (结果 === '往下放' && 自己 === '左')
                    ) {
                        re = `面朝BOSS，然后向${自己}走一步`;
                    } else re = `背对BOSS，然后向${自己}走一步`;
                }
                //竖排上
                if (
                    [data.P3小电视站位.上2, data.P3小电视站位.上1].includes(data.myJob)
                ) {
                    if (
                        (boss === '右' && 自己 === '右') ||
                        (boss === '左' && 自己 === '左')
                    ) {
                        re = `面朝BOSS，然后向${自己}走一步`;
                    } else re = `背对BOSS，然后向${自己}走一步`;
                }
                //竖排下
                if (
                    [data.P3小电视站位.下2, data.P3小电视站位.下1].includes(data.myJob)
                ) {
                    if (
                        (boss === '右' && 自己 === '右') ||
                        (boss === '左' && 自己 === '左')
                    ) {
                        re = `背对BOSS，然后向${自己}走一步`;
                    } else re = `面朝BOSS，然后向${自己}走一步`;
                }
                return re;
            },
        },
        {
            id: 'P3 小电视没点名的人的半场',
            type: 'GainsEffect',
            netRegex: {effectId: ['D7C', 'D7D'], capture: false},
            suppressSeconds: 3,
            delaySeconds: 2,
            durationSeconds: 5,
            condition: (data) => {
                return !data.P5 && P3TV === 1
            },
            infoText: (data, matches) => {
                if (
                    [
                        data.P3小电视站位.上2,
                        data.P3小电视站位.上1,
                        data.P3小电视站位.下2,
                        data.P3小电视站位.下1,
                    ].includes(data.myJob)
                ) {
                    if (data.P3BOSS电视 === '左') {
                        return '站右半场';
                    } else {
                        return '站左半场';
                    }
                }
            },
        },
        //日基小电视标记
        {
            id: 'P3 小电视点名标记(日基)',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({
                effectId: ['D7D', 'D7C'],
                capture: true,
            }),
            durationSeconds: 5,
            condition: (data) => {
                return !data.P5 && P3TV === 2
            },
            preRun: (data, matches) => {
                data.P3小电视点名.push(matches.target);
            },
            run: (data) => {
                if (!Mark.includes(3)) return
                if (data.P3小电视点名.length === 3) {
                    let 点名 = data.P3小电视点名.sort((a, b) => {
                        return data._party.indexOf(a) - data._party.indexOf(b)
                    });
                    let 无点名 = subSet(data._party, 点名).sort((a, b) => {
                        return data._party.indexOf(a) - data._party.indexOf(b)
                    });
                    let temp = 点名.concat(无点名);
                    let mark = ['bind1', 'bind2', 'bind3', 'attack1', 'attack2', 'attack3', 'attack4', 'attack5']

                    let dic = {};
                    for (const i of temp) {
                        let name = i;
                        let _mark = mark[temp.indexOf(i)];
                        dic[_mark] = name;
                    }
                    if (nametocnjob(dic['attack2'], data) === '镰刀' && nametocnjob(dic['attack3'], data) === '武僧') {
                        let temp = dic['attack2']
                        dic['attack2'] = dic['attack3'];
                        dic['attack3'] = temp;
                    }
                    if (!useMark) return
                    for (const i in dic) {
                        if (dic.hasOwnProperty(i)) {
                            PostNamazu('mark', {
                                Name: dic[i],
                                MarkType: i,
                                LocalOnly: onlyMeMarkP3,
                            })
                        }
                    }
                }
            },
        },
        //
        {
            id: 'TOP Oversampled Wave Cannon Loading',
            type: 'GainsEffect',
            // D7C = Oversampled Wave Cannon Loading (facing right)
            // D7D = Oversampled Wave Cannon Loading (facing left)
            netRegex: {effectId: ['D7C', 'D7D']},
            disabled: true,
        },
        {
            id: 'TOP Oversampled Wave Cannon East',
            type: 'StartsUsing',
            netRegex: {id: ['7B6B', '7B6C'], capture: true},
            run: (data, matches) =>
                (data.P3BOSS电视 = matches.id === '7B6B' ? '右' : '左'),
        },
        {
            id: 'TOP Oversampled Wave Cannon West',
            type: 'StartsUsing',
            netRegex: {id: '7B6C', source: 'Omega', capture: false},
            disabled: true,
        },
        {
            id: 'P3 狂暴',
            type: 'StartsUsing',
            netRegex: {id: '7B48', capture: false},
            alertText: 'P3狂暴',
            run: () => {
                PostNamazuMarkClear();
            },
        },

        //P4

        {
            id: 'TOP Wave Cannon Stack Collector',
            type: 'Ability',
            netRegex: {id: '5779'},
            delaySeconds: 5,
            suppressSeconds: 1,
            infoText: (data) => {
                data.P4波动炮++;
                if (data.P4波动炮 === 2 || data.P4波动炮 === 3) {
                    if (data.P4波动炮 === 2) {
                        return '第2轮八方，目标圈外穿地火';
                    } else {
                        return '第3轮八方';
                    }
                }
            },
        },
        {
            id: 'TOP Wave Cannon Stack',
            type: 'Ability',
            netRegex: {id: '5779'},
            preRun: (data, matches) => {
                data.P4点名.push(matches.target);
            },
            alertText: (data) => {
                if (data.P4点名.length !== 2) return;
                let left = [
                    data.职业位置.MT,
                    data.职业位置.D3,
                    data.职业位置.H1,
                    data.职业位置.D1,
                ];
                let right = [
                    data.职业位置.ST,
                    data.职业位置.D4,
                    data.职业位置.H2,
                    data.职业位置.D2,
                ];
                let p1 = data.P4点名[0];
                let p2 = data.P4点名[1];
                p1 = nametocnjob(p1, data);
                p2 = nametocnjob(p2, data);
                let job = nametocnjob(data.me, data);
                data.P4点名 = [];
                let 补充 = data.P4波动炮 === 3 ? '，目标圈外穿地火' : '';

                if (
                    (left.includes(p1) && left.includes(p2)) ||
                    (right.includes(p1) && right.includes(p2))
                ) {
                    //点名在同一边
                    //P1 P2排序
                    if (left.includes(p1)) {
                        //全在左边
                        if (left.indexOf(p1) > left.indexOf(p2)) {
                            let temp = p1;
                            p2 = p1;
                            p1 = temp;
                        }
                    } else {
                        //全在右边
                        if (right.indexOf(p1) > right.indexOf(p2)) {
                            let temp = p1;
                            p2 = p1;
                            p1 = temp;
                        }
                    }

                    if (p2 === job) {
                        //自己是否是下面那个点名
                        return `去对面组分摊${补充}`;
                    }

                    if (job === data.职业位置.D1 || job === data.职业位置.D2) {
                        //自己是D1或D2
                        let p = left.includes(job) ? left : right; //	自己所在的组
                        if (!p.includes(p1)) {
                            //自己组是否无点名
                            return `去对面组分摊${补充}`;
                        }
                    }
                    return `八方后分摊${补充}`;
                }
                return `八方后分摊${补充}`;
            },
        },
        {
            id: 'P4 狂暴',
            type: 'StartsUsing',
            netRegex: {id: '7B7B', capture: false},
            alertText: 'P4狂暴',
            run: (data) => {
                //删除前4P变量
                data.smellDefamation = undefined;
                data.smellRot = undefined;
                data.regression = undefined;
                data.bugRot = undefined;
                data.P3手臂次数 = undefined;
                data.P3HW轮次 = undefined;
                data.P3小电视点名 = undefined;
                data.P4点名 = undefined;
                data.P4波动炮 = undefined;
                data.bobaoIndex = undefined;
                data.bobao = undefined;
                data.myMarker = undefined;
                data.P2男女组合技FFD = undefined;
                data.linePos = undefined;
                data.P2_5分散人 = undefined;
                data.P2_5分摊人 = undefined;
                data.P2_5无点名 = undefined;
                data.defamationColor = undefined;
                data.P3HW大圈塔 = undefined;
                data.P3HW分摊塔 = undefined;
                data.HW1 = undefined;
                data.HW2 = undefined;
                data.P3HWtts = undefined;
                data.P3小电视站位 = undefined;
                data.P3小电视补充 = undefined;
                data.P3点名3人组 = undefined;
                data.P3BOSS电视 = undefined;
                data.pantoMissileCount = undefined;
                data.loopBlasterCount = undefined;
                data.meteorTargets = undefined;
                data.latentDefectCount = undefined;
                data.patchVulnCount = undefined;
                data.waveCannonStacks = undefined;
                data.monitorPlayers = undefined;
                data.P5 = true;
            },
        },

        //P5
        {
            id: 'TOP Delta Tethers',
            type: 'GainsEffect',
            // D70 Local Code Smell (red/green)
            // DB0 Remote Code Smell (blue)
            netRegex: {effectId: ['D70', 'DB0']},
            disabled: true
        },
        {
            id: 'P5开始',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({id: '7B88', capture: false}),
            run: (data) => {
                data.P5一运 = true;
                data.P5一运线 = {
                    蓝线: [],
                    绿线: [],
                };
                data.P5一运线count = 0;
                data.P5一运拳头pos = [];
                data.P5一运玩家pos = {};
                data.P5一运走法 = {
                    蓝线远组: null,
                    蓝线近组: null,
                    攻击组: null,
                    禁止组: null,
                    世界远: null,
                    世界近: null,
                    小电视: null,
                };

                data.P5潜能量 = {};
                let party = data.party.partyNames;
                for (let i in party) {
                    if (!party.includes(party[i])) return
                    data.P5潜能量[party[i]] = 0;
                }
            },
            alarmText: '超大AOE，一运开始',
        },
        {
            id: 'P5 潜能量收集',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({
                effectId: ['D74'],
            }),
            condition: (data) => data.P5,
            run: (data, matches) => {
                let name = matches.target;
                data.P5潜能量[name] = data.P5潜能量[name] + 1;
            }
        },

        //00C9绿线
        //00C8蓝线

        // "P5一运线": {
        // 	"绿线": [  						data.P5一运线.绿线[0]为场外组，标记攻击12
        // 		[
        // 			"xx",		攻击1
        // 			"xx",		攻击2
        // 		],
        // 		[										data.P5一运线.绿线[1]为场内组，标记禁止12
        // 			"xx",		禁止1
        // 			"xx",		禁止2
        // 		]
        // 	],
        // 	"蓝线": [
        // 		[
        // 			"xx",
        // 			"xx",
        // 		],
        // 		[
        // 			"xx",
        // 			"xx",
        // 		]
        // 	]
        // }
        {
            id: '欧密茄p5一运连线出现',
            type: 'Tether',
            netRegex: NetRegexes.tether({id: ['00C8', '00C9']}),
            condition: (data) => data.P5 && data.P5一运,
            preRun: (data, matches) => {
                if (matches.id === '00C8') {
                    data.P5一运线.绿线.push([matches.source, matches.target]);
                } else {
                    data.P5一运线.蓝线.push([matches.source, matches.target]);
                }
                data.P5一运线count++;
            },
            alertText: (data) => {
                if (data.P5一运线count === 4) {
                    if (data.P5一运线.绿线[0][0] === data.me)
                        return '绿线，去蟑螂右边靠外';
                    if (data.P5一运线.绿线[0][1] === data.me)
                        return '绿线，去蟑螂左边靠外';
                    if (data.P5一运线.绿线[1][0] === data.me)
                        return '绿线，去蟑螂右边靠内';
                    if (data.P5一运线.绿线[1][1] === data.me)
                        return '绿线，去蟑螂左边靠内';
                    return '蓝线，靠近光头拉线';
                }
            },
            run: (data) => {
                if (!Mark.includes(5)) return
                if (data.P5一运线count === 4) {
                    //标记
                    data.P5一运走法.攻击组 = data.P5一运线.绿线[0];
                    data.P5一运走法.禁止组 = data.P5一运线.绿线[1];
                    PostNamazu('mark', {
                        Name: data.P5一运线.绿线[0][0],
                        MarkType: P5一运标记.外侧1,
                        LocalOnly: onlyMeMarkP5,
                    });
                    PostNamazu('mark', {
                        Name: data.P5一运线.绿线[0][1],
                        MarkType: P5一运标记.外侧2,
                        LocalOnly: onlyMeMarkP5,
                    });
                    PostNamazu('mark', {
                        Name: data.P5一运线.绿线[1][0],
                        MarkType: P5一运标记.内侧1,
                        LocalOnly: onlyMeMarkP5,
                    });
                    PostNamazu('mark', {
                        Name: data.P5一运线.绿线[1][1],
                        MarkType: P5一运标记.内侧2,
                        LocalOnly: onlyMeMarkP5,
                    });
                }
            },
        },
        {
            id: 'P5 一运大拳拳收集',
            type: 'AddedCombatant',
            netRegex: NetRegexes.addedCombatantFull({
                npcBaseId: ['15709', '15710'],
            }),
            condition: (data) => data.P5 && data.P5一运,
            run: (data, matches) => {
                data.P5一运拳头pos.push([matches.x, matches.y]);
            },
        },
        {
            id: 'P5 一运大拳拳出现',
            type: 'AddedCombatant',
            netRegex: NetRegexes.addedCombatantFull({
                npcBaseId: ['15709', '15710'],
            }),
            condition: (data) => data.P5 && data.P5一运,
            suppressSeconds: 10,
            delaySeconds: 0.5,
            promise: async (data, matches) => {
                //收集玩家位置
                let all = await callOverlayHandler({
                    call: 'getCombatants',
                    names: data.party.partyNames_,
                });
                all = all.combatants;
                for (const i in all) {
                    data.P5一运玩家pos[all[i].Name] = [all[i].PosX, all[i].PosY];
                }
            },
            infoText: '同换异不换',
        },
        //D70 绿线伴随的buff
        //DB0 蓝线伴随的buff
        //D73 世界远，靠场边
        //D72 世界近，绿线中点
        {
            id: 'P5 一运世界近远收集',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({
                effectId: ['D73', 'D72'],
            }),
            condition: (data) => data.P5 && data.P5一运,
            run: (data, matches) => {
                if (matches.effectId === 'D73') {
                    data.P5一运走法.世界远 = matches.target;
                } else {
                    data.P5一运走法.世界近 = matches.target;
                }
            },
        },
        {
            id: 'P5 一运放黄圈',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({
                effectId: ['D70', 'DB0'],
            }),
            condition: (data) => data.P5 && data.P5一运,
            suppressSeconds: 10,
            delaySeconds: 17,
            alertText: (data) => {
                //计算拉蓝线最近的组
                let 蓝线组1 = data.P5一运线.蓝线[0];
                let 蓝线组2 = data.P5一运线.蓝线[1];
                let x1 = data.P5一运玩家pos[蓝线组1[0]][0];
                let y1 = data.P5一运玩家pos[蓝线组1[0]][1];
                let x2 = data.P5一运玩家pos[蓝线组1[1]][0];
                let y2 = data.P5一运玩家pos[蓝线组1[1]][1];
                let dis1 = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                x1 = data.P5一运玩家pos[蓝线组2[0]][0];
                y1 = data.P5一运玩家pos[蓝线组2[0]][1];
                x2 = data.P5一运玩家pos[蓝线组2[1]][0];
                y2 = data.P5一运玩家pos[蓝线组2[1]][1];
                let dis2 = Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
                let 蓝线近组 = dis1 < dis2 ? 蓝线组1 : 蓝线组2;
                let 蓝线远组 = dis1 > dis2 ? 蓝线组1 : 蓝线组2;
                data.P5一运走法.蓝线近组 = 蓝线近组;
                data.P5一运走法.蓝线远组 = 蓝线远组;
                //tts
                if (蓝线远组.includes(data.me)) return '靠近放黄圈，然后去场中前后站';
                return '放黄圈，然后引导转转手';
            },
        },
        {
            id: 'P5 一运小电视点名',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({
                effectId: ['D7D', 'D7C'],
            }),
            condition: (data) => data.P5 && data.P5一运,
            run: (data, matches) => {
                data.P5一运走法.小电视 = matches.target;
            },
        },
        {
            id: 'P5 一运投盾',
            type: 'Ability',
            netRegex: NetRegexes.ability({id: '7B28'}),
            condition: (data) => data.P5 && data.P5一运,
            suppressSeconds: 5,
            alertText: (data, matches) => {
                let 补充 = '';
                if (data.P5一运走法.小电视 === data.me) 补充 = ',站最外放小电视';
                if (matches.target === data.me) {
                    //点你
                    return `靠近光头躲避分摊${补充}`;
                } else {
                    //不点你
                    if (
                        data.P5一运走法.蓝线近组.includes(data.me) ||
                        data.P5一运走法.蓝线远组.includes(data.me)
                    ) {
                        return `靠近BOSS吃分摊${补充}`;
                    }
                }
            },
        },
        {
            id: 'P5 一运后半阶段',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({
                effectId: ['D73', 'D72'],
            }),
            condition: (data) => data.P5 && data.P5一运,
            suppressSeconds: 5,
            delaySeconds: 31,
            alertText: (data) => {
                if (data.me === data.P5一运走法.世界近)
                    return '近点名，去绿线中点靠场内';
                if (data.me === data.P5一运走法.世界远) return '远点名，去正点靠场边';
                if (
                    data.P5一运走法.蓝线近组.includes(data.me) ||
                    data.P5一运走法.蓝线远组.includes(data.me)
                )
                    return '无点名，远离蟑螂靠场边躲避其他人';
                if (data.P5一运走法.禁止组.includes(data.me))
                    return '绿线组，让绿线与AOE边界平行';
            },
        },
        {
            id: 'P5 一运后半阶段第一次拉绿线',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({
                effectId: ['D73', 'D72'],
            }),
            condition: (data) => data.P5 && data.P5一运,
            suppressSeconds: 5,
            delaySeconds: 38,
            alertText: (data) => {
                if (data.P5一运走法.攻击组.includes(data.me))
                    return '靠近拉断线，然后在蟑螂一侧引导近点名';
            },
        },
        {
            id: 'P5 一运后半阶段第二次拉绿线',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({
                effectId: ['D73', 'D72'],
            }),
            condition: (data) => data.P5 && data.P5一运,
            suppressSeconds: 5,
            delaySeconds: 51,
            alertText: (data) => {
                if (data.P5一运走法.禁止组.includes(data.me)) return '靠近拉断线';
            },
        },
        {
            id: 'P5 二运开始',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({id: '8014', capture: false}),
            run: (data) => {
                data.P5一运 = false;
                data.P5一运线 = undefined;
                data.P5一运线count = undefined;
                data.P5一运拳头pos = undefined;
                data.P5一运玩家pos = undefined;
                data.P5一运走法 = undefined;
                data.P5二运on = true;
                data.P5二运 = {};
                data.P5二运红点名 = [];
                data.P5二运走法 = {};
                data.P5二运走法.女人对面 = [];

            },
            alarmText: '超大AOE,二运开始',
        },
        {
            id: 'P5 二运世界近远收集',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({
                effectId: ['D73', 'D72'],
            }),
            condition: (data) => data.P5 && data.P5二运on,
            run: (data, matches) => {
                if (matches.effectId === 'D73') {
                    data.P5二运走法.世界远 = matches.target;
                    data.P5二运走法.女人对面.push(matches.target);
                } else {
                    data.P5二运走法.世界近 = matches.target;
                    data.P5二运走法.女人对面.push(matches.target);
                }
            },
        },
        {
            id: 'P5 二运开场男人画图',
            type: 'Ability',
            netRegex: NetRegexes.ability({id: '8014'}),
            delaySeconds: 6,
            suppressSeconds: 10,
            run: () => {
                //画图
                let namespace = 'P5二运男人位置';
                let time = '35000';
                let json = `{
					"Name": "二运男人位置",
					"type": 1,
					"radius": 5.52,
					"color": 1677721855,
					"overlayFScale": 1.5,
					"thicc": 3.9,
					"overlayText": "正北12点",
					"refActorNPCNameID": 12257,
					"refActorComparisonType": 6,
					"onlyVisible": true,
					"Filled": true
				}`;
                Splatoon(namespace, time, json);
            }

        },
        {
            id: 'P5 二运tts和标记',
            type: 'Ability',
            netRegex: NetRegexes.ability({id: '8014'}),
            delaySeconds: 13.5,
            suppressSeconds: 10,
            alertText: (data) => {
                let 索尼 = {};
                索尼.圆圈 = [];
                索尼.叉 = [];
                索尼.三角 = [];
                索尼.方块 = [];
                for (let i in data.synergyMarker) {
                    data.P5二运[i] = {};
                    data.P5二运[i].索尼 = data.synergyMarker[i];
                    data.P5二运[i].上下优先级 = 0;
                    data.P5二运[i].左右优先级 = 0;
                    if (data.P5二运[i].索尼 === '圆圈') data.P5二运[i].上下优先级 = 1;
                    if (data.P5二运[i].索尼 === '叉') data.P5二运[i].上下优先级 = 2;
                    if (data.P5二运[i].索尼 === '三角') data.P5二运[i].上下优先级 = 3;
                    if (data.P5二运[i].索尼 === '方块') data.P5二运[i].上下优先级 = 4;
                    //
                    if (data.synergyMarker[i] === '圆圈') 索尼.圆圈.push(i);
                    if (data.synergyMarker[i] === '叉') 索尼.叉.push(i);
                    if (data.synergyMarker[i] === '三角') 索尼.三角.push(i);
                    if (data.synergyMarker[i] === '方块') 索尼.方块.push(i);
                }
                //排左右优先级
                if (data.职业优先级[nametocnjob(索尼.圆圈[0], data)] > data.职业优先级[nametocnjob(索尼.圆圈[1], data)]) {
                    索尼.圆圈.reverse();
                }
                if (data.职业优先级[nametocnjob(索尼.叉[0], data)] > data.职业优先级[nametocnjob(索尼.叉[1], data)]) {
                    索尼.叉.reverse();
                }
                if (data.职业优先级[nametocnjob(索尼.三角[0], data)] > data.职业优先级[nametocnjob(索尼.三角[1], data)]) {
                    索尼.三角.reverse();
                }
                if (data.职业优先级[nametocnjob(索尼.方块[0], data)] > data.职业优先级[nametocnjob(索尼.方块[1], data)]) {
                    索尼.方块.reverse();
                }
                for (const i in data.P5二运) {
                    data.P5二运[i].左右优先级 = 索尼[data.P5二运[i].索尼].indexOf(i) + 1
                }
                //
                data.P5二运无点名 = subSet(data.party.partyNames, data.P5二运红点名);

                //计算位置
                //无点名
                if (data.P5二运[data.P5二运无点名[0]].上下优先级 < data.P5二运[data.P5二运无点名[1]].上下优先级) {
                    data.P5二运[data.P5二运无点名[0]].位置 = '左上';
                    data.P5二运[data.P5二运无点名[1]].位置 = '右上';
                } else {
                    data.P5二运[data.P5二运无点名[0]].位置 = '右上';
                    data.P5二运[data.P5二运无点名[1]].位置 = '左上';
                }
                //单点名
                let 单组 = [data.P5二运[data.P5二运无点名[0]].索尼, data.P5二运[data.P5二运无点名[1]].索尼];
                for (let i = 0; i < 2; i++) {
                    let old_name = data.P5二运无点名[i];
                    let old_path = data.P5二运[old_name].位置;

                    let a = old_path[0] === '左' ? '右' : '左';
                    let b = old_path[1] === '上' ? '下' : '上';
                    let new_path = a + b;
                    let new_name = subSet(索尼[单组[i]], data.P5二运无点名[i]);

                    data.P5二运[new_name].位置 = new_path;
                }
                //双点名
                let 双组 = subSet(Object.keys(索尼), 单组);
                let a = 索尼[双组[0]];
                let b = 索尼[双组[1]];
                if (data.P5二运[a[0]].左右优先级 > data.P5二运[a[1]].左右优先级) a.reverse();
                if (data.P5二运[b[0]].左右优先级 > data.P5二运[b[1]].左右优先级) b.reverse();
                let temp = [a, b];
                if (data.P5二运[temp[0][0]].上下优先级 > data.P5二运[temp[1][0]].上下优先级) temp.reverse();

                data.P5二运[temp[0][0]].位置 = '上';
                data.P5二运[temp[0][1]].位置 = '下';
                data.P5二运[temp[1][0]].位置 = '左';
                data.P5二运[temp[1][1]].位置 = '右';

                //tts
                return `去${data.P5二运[data.me].位置}，${data.glitch}`
            },
            run: (data) => {
                if (!Mark.includes(5)) return
                for (const i in data.P5二运) {
                    PostNamazu('mark', {
                        Name: i,
                        MarkType: P5二运标记[data.P5二运[i].位置],
                        LocalOnly: onlyMeMarkP5,
                    });
                }
            },
        },
        {
            id: 'P5 二运塔tts+画图',
            type: 'Ability',
            netRegex: NetRegexes.ability({id: '8014'}),
            delaySeconds: 26,
            suppressSeconds: 10,
            promise: async (data) => {
                //收集塔和欧米茄位置
                let all = await callOverlayHandler({
                    call: 'getCombatants',
                });
                all = all.combatants;
                data.P5二运塔 = [];
                data.P5人 = [];
                for (const i in all) {
                    if (all[i].BNpcID === 2013246 || all[i].BNpcID === 2013245) {
                        data.P5二运塔.push([all[i].PosX, all[i].PosY]);
                    }
                    ;
                    if (欧米茄M.includes(all[i].Name)) {
                        data.P5人.push([all[i].PosX, all[i].PosY]);
                    }
                }
                data.P5二运塔方向 = {
                    上: [100, 100],
                    下: [100, 100],
                    右: [100, 100],
                    左: [100, 100],
                    右上: [100, 100],
                    左上: [100, 100],
                    右下: [100, 100],
                    左下: [100, 100],
                };
                for (let i = 0; i < data.P5二运塔.length; i++) {
                    let pos = data.P5二运塔[i];
                    let angle = math.向量夹角(data.P5人[0], pos);

                    if (-5 < angle && angle < 5) data.P5二运塔方向.上 = pos;
                    if (angle > 175 || angle < -175) data.P5二运塔方向.下 = pos;
                    if (60 < angle && angle < 120) data.P5二运塔方向.右 = pos;
                    if (-60 > angle && angle > -120) data.P5二运塔方向.左 = pos;

                    if (15 < angle && angle < 50) data.P5二运塔方向.右上 = pos;
                    if (-15 > angle && angle > -50) data.P5二运塔方向.左上 = pos;
                    if (133 < angle && angle < 165) data.P5二运塔方向.右下 = pos;
                    if (-133 > angle && angle > -165) data.P5二运塔方向.左下 = pos;
                    console.log('P5二运塔：', data.P5二运塔方向);
                }
            },
            alertText: (data) => {
                let 塔数量 = data.P5二运塔.length;
                let type = '';
                var x = 0;
                var y = 0;
                for (let i = 0; i < 塔数量; i++) {
                    x = x + data.P5二运塔[i][0];
                    y = y + data.P5二运塔[i][1];
                }
                let pos = [x / 塔数量, y / 塔数量];
                let myPath = data.P5二运[data.me].位置;

                if (塔数量 === 5) {
                    //5塔远线
                    type = (math.两点距离(pos, data.P5人[0]) < 20) ? '倒' : '正';
                    if (type === '正') {
                        if (myPath === '上' || myPath === '左上') data.P5二运我的塔 = '上';
                        if (myPath === '左下' || myPath === '右下') data.P5二运我的塔 = '左下';
                        if (myPath === '下' || myPath === '右') data.P5二运我的塔 = '右下';
                        if (myPath === '左') data.P5二运我的塔 = '左';
                        if (myPath === '右上') data.P5二运我的塔 = '右';
                    } else {
                        if (myPath === '下' || myPath === '右下') data.P5二运我的塔 = '下';
                        if (myPath === '左上' || myPath === '左') data.P5二运我的塔 = '左上';
                        if (myPath === '上' || myPath === '右上') data.P5二运我的塔 = '右上';
                        if (myPath === '左下') data.P5二运我的塔 = '左';
                        if (myPath === '右') data.P5二运我的塔 = '右';
                    }
                } else {
                    //6塔近线
                    type = math.两点距离(pos, data.P5人[0]) < 20 ? '倒' : '正';
                    if (type === '正') {
                        if (myPath === '左上') data.P5二运我的塔 = '左上';
                        if (myPath === '上') data.P5二运我的塔 = '右上';
                        if (myPath === '左下') data.P5二运我的塔 = '左下';
                        if (myPath === '右') data.P5二运我的塔 = '右下';
                        if (myPath === '左' || myPath === '右下') data.P5二运我的塔 = '左';
                        if (myPath === '右上' || myPath === '下') data.P5二运我的塔 = '右';
                    } else {
                        if (myPath === '左') data.P5二运我的塔 = '左上';
                        if (myPath === '右上') data.P5二运我的塔 = '右上';
                        if (myPath === '右下') data.P5二运我的塔 = '左下';
                        if (myPath === '下') data.P5二运我的塔 = '右下';
                        if (myPath === '左上' || myPath === '左下') data.P5二运我的塔 = '左';
                        if (myPath === '右' || myPath === '上') data.P5二运我的塔 = '右';
                    }
                }
                let re = (data.glitch === '远离') ? '远线靠边站' : '近线靠内站';
                return `${data.P5二运我的塔}塔，${re}`
            },
            run: (data) => {
                //画图
                let x = data.P5二运塔方向[data.P5二运我的塔][0];
                let y = data.P5二运塔方向[data.P5二运我的塔][1];
                console.log('画塔', [x, y]);
                if (x === 100 && y === 100) return
                console.log('画塔', [x, y], '成功');
                let namespace = 'P5二运击退塔';
                let time = '7000';
                let json = `{
          "Name": "连线塔",
          "refX": ${x},
          "refY": ${y},
          "radius": 3.0,
          "color": 4289265408,
          "thicc": 6.3,
          "overlayText": "击退进塔",
          "tether": true
        }`;
                Splatoon(namespace, time, json);
            }
        },
        {
            id: 'P5 二运后半+标记',
            type: 'Ability',
            netRegex: NetRegexes.ability({
                id: '8014'
            }),
            delaySeconds: 36,
            suppressSeconds: 10,
            durationSeconds: 20,
            alertText: (data) => {
                let HW = [data.P5二运走法.世界近, data.P5二运走法.世界远];
                data.P5二运走法.拉手 = [];
                data.P5二运走法.女人同侧 = [];
                for (const i in data.P5潜能量) {
                    if (data.P5潜能量[i] === 0) continue
                    if (HW.includes(i)) continue
                    if (data.P5二运走法.拉手.length >= 2) break
                    data.P5二运走法.拉手.push(i);
                    data.P5二运走法.女人同侧.push(i);
                }
                let 固定 = HW.concat(data.P5二运走法.拉手);
                let 传递 = subSet(data.party.partyNames, 固定);
                //固定优先级排序（防止每个人科技的顺序随机）
                传递 = 传递.sort((a, b) => {
                    return data._party.indexOf(a) - data._party.indexOf(b)
                });
                data.P5二运走法.拉手 = data.P5二运走法.拉手.sort((a, b) => {
                    return data._party.indexOf(a) - data._party.indexOf(b)
                });

                data.P5二运走法.近传递 = [传递[0], 传递[1]];
                data.P5二运走法.女人对面.push(传递[0]);
                data.P5二运走法.女人对面.push(传递[1]);
                data.P5二运走法.远传递 = [传递[2], 传递[3]];
                data.P5二运走法.女人对面.push(传递[2]);
                data.P5二运走法.女人同侧.push(传递[3]);
                //self
                let 补充 = '';
                if (data.P5二运走法.女人对面.includes(data.me)) {
                    补充 = '，去女人对面起跑'
                } else {
                    补充 = '，去女人同侧起跑'
                }
                if (data.P5二运走法.世界近 === data.me) return `近点名${补充}`
                if (data.P5二运走法.世界远 === data.me) return `远点名${补充}`
                if (data.P5二运走法.拉手.includes(data.me)) return `引导手${补充}`
                if (data.P5二运走法.近传递.includes(data.me)) return `近传递${补充}`
                if (data.P5二运走法.远传递.includes(data.me)) return `远传递${补充}`
            },
            run: (data) => {
                //标记
                if (!Mark.includes(5)) return
                for (const i in data.P5潜能量) {
                    let name = i;
                    let mark = '';
                    if (data.P5二运走法.世界近 === name)
                        mark = P5二运后半标记.世界近;
                    if (data.P5二运走法.世界远 === name)
                        mark = P5二运后半标记.世界远;
                    if (data.P5二运走法.拉手[0] === name)
                        mark = P5二运后半标记.手引导左;
                    if (data.P5二运走法.拉手[1] === name)
                        mark = P5二运后半标记.手引导右;
                    if (data.P5二运走法.近传递[0] === name)
                        mark = P5二运后半标记.近传递左;
                    if (data.P5二运走法.近传递[1] === name)
                        mark = P5二运后半标记.近传递右;
                    if (data.P5二运走法.远传递[0] === name)
                        mark = P5二运后半标记.远传递左;
                    if (data.P5二运走法.远传递[1] === name)
                        mark = P5二运后半标记.远传递右;

                    PostNamazu('mark', {
                        Name: name,
                        MarkType: mark,
                        LocalOnly: onlyMeMarkP5,
                    });
                    console.log('P5二运后半标记', name, mark);
                }
            },
        },
        {
            id: 'P5 二运后半判断转转手顺逆时针',
            type: 'HeadMarker',
            netRegex: {},
            condition: (data) => data.P5二运on,
            suppressSeconds: 5,
            run: (data, matches) => {
                const id = getHeadmarkerId(data, matches);
                if (id === '009C') data.P5二运后半转转 = '顺时针'
                if (id === '009D') data.P5二运后半转转 = '逆时针'
            },
        },
        {
            id: 'P5 二运组合技',
            type: 'Ability',
            netRegex: NetRegexes.ability({
                id: '8014'
            }),
            delaySeconds: 41,
            suppressSeconds: 10,
            promise: async (data) => {
                let boss = await callOverlayHandler({
                    call: 'getCombatants',
                    names: 欧米茄M,
                });
                boss = boss.combatants[0];
                let skills = '';
                skills = boss.WeaponId === 11 ? '十字' : '辣翅';
                data.P5二运组合技 = skills;
            },
            alertText: (data) => {
                if (data.P5二运组合技 === '十字') {
                    return '十字，等一步再走'
                }
                if (data.P5二运组合技 === '辣翅') {
                    return '辣翅，快走快走'
                }
            },
            run: (data) => {
                //画图
                const 位置 = {
                    HW近: `{
						"Name": "HW近",
						"type": 1,
						"offX": -0.24,
						"offY": 19.7,
						"radius": 0.9,
						"overlayBGColor": 4278190080,
						"overlayVOffset": 1.2,
						"thicc": 3.5,
						"overlayText": "HW近",
						"refActorNPCID": 12258,
						"refActorComparisonType": 4,
						"includeRotation": true,
						"onlyVisible": true,
						"tether": true
					}`,
                    近传递右: `{
						"Name": "HW近传1",
						"type": 1,
						"offX": 3.6,
						"offY": 28.0,
						"radius": 0.9,
						"overlayBGColor": 4278584838,
						"overlayVOffset": 1.2,
						"thicc": 3.5,
						"overlayText": "近传递 2",
						"refActorNPCID": 12258,
						"refActorComparisonType": 4,
						"includeRotation": true,
						"onlyVisible": true,
						"tether": true
					}`,
                    近传递左: `{
						"Name": "HW近传2",
						"type": 1,
						"offX": -3.6,
						"offY": 28.0,
						"radius": 0.9,
						"overlayBGColor": 4278190080,
						"overlayVOffset": 1.2,
						"thicc": 3.5,
						"overlayText": "近传递 1",
						"refActorNPCID": 12258,
						"refActorComparisonType": 4,
						"includeRotation": true,
						"onlyVisible": true,
						"tether": true
					}`,
                    HW远1: `{
						"Name": "HW远1",
						"type": 1,
						"offX": -9.4,
						"offY": 9.82,
						"radius": 0.9,
						"color": 3371958527,
						"overlayBGColor": 4278190080,
						"overlayVOffset": 1.2,
						"thicc": 3.5,
						"overlayText": "HW远",
						"refActorNPCID": 12258,
						"refActorComparisonType": 4,
						"includeRotation": true,
						"onlyVisible": true,
						"tether": true
					}`,
                    HW远2: `{
						"Name": "HW远2",
						"type": 1,
						"offX": 10.26,
						"offY": 9.88,
						"radius": 0.9,
						"color": 3371958527,
						"overlayBGColor": 4278190080,
						"overlayVOffset": 1.2,
						"thicc": 3.5,
						"overlayText": "HW远",
						"refActorNPCID": 12258,
						"refActorComparisonType": 4,
						"includeRotation": true,
						"onlyVisible": true,
						"tether": true
					}`,
                    远传递左: `{
						"Name": "HW远传1",
						"type": 1,
						"offX": -18.48,
						"offY": 9.82,
						"radius": 0.9,
						"color": 3371958527,
						"overlayBGColor": 4261412864,
						"overlayVOffset": 1.2,
						"thicc": 3.5,
						"overlayText": "远传递 1",
						"refActorNPCID": 12258,
						"refActorComparisonType": 4,
						"includeRotation": true,
						"onlyVisible": true,
						"tether": true
					}`,
                    远传递右: `{
						"Name": "HW远传2",
						"type": 1,
						"offX": 18.44,
						"offY": 9.82,
						"radius": 0.9,
						"color": 3371958527,
						"overlayBGColor": 4278190080,
						"overlayVOffset": 1.2,
						"thicc": 3.5,
						"overlayText": "远传递 2",
						"refActorNPCID": 12258,
						"refActorComparisonType": 4,
						"includeRotation": true,
						"onlyVisible": true,
						"tether": true
					}`,
                    手引导左: `{
						"Name": "手引导1",
						"type": 1,
						"offX": -10.92,
						"offY": -5.36,
						"radius": 0.9,
						"color": 3372219392,
						"overlayBGColor": 4278190080,
						"overlayVOffset": 1.2,
						"thicc": 3.5,
						"overlayText": "引导手 2",
						"refActorNPCID": 12258,
						"refActorComparisonType": 4,
						"includeRotation": true,
						"onlyVisible": true,
						"tether": true
					}`,
                    手引导右: `{
						"Name": "手引导2",
						"type": 1,
						"offX": 11.02,
						"offY": -5.36,
						"radius": 0.9,
						"color": 3372219392,
						"overlayBGColor": 4278190080,
						"overlayVOffset": 1.2,
						"thicc": 3.5,
						"overlayText": "引导手 1",
						"refActorNPCID": 12258,
						"refActorComparisonType": 4,
						"includeRotation": true,
						"onlyVisible": true,
						"tether": true
					}`
                };
                let namespace = 'P5二运后半连线';
                let time = '20000';
                let json = '';
                if (data.P5二运走法.世界近 === data.me) json = 位置.HW近;
                if (data.P5二运走法.世界远 === data.me) json = 位置.HW远1;
                if (data.P5二运后半转转 === '逆时针') {
                    if (data.P5二运走法.拉手[0] === data.me) json = 位置.手引导左;
                    if (data.P5二运走法.拉手[1] === data.me) json = 位置.手引导右;
                    if (data.P5二运走法.近传递[0] === data.me) json = 位置.近传递左;
                    if (data.P5二运走法.近传递[1] === data.me) json = 位置.近传递右;
                    if (data.P5二运走法.远传递[0] === data.me) json = 位置.远传递左;
                    if (data.P5二运走法.远传递[1] === data.me) json = 位置.远传递右;
                }
                if (data.P5二运后半转转 === '顺时针') {
                    if (data.P5二运走法.拉手[0] === data.me) json = 位置.手引导右;
                    if (data.P5二运走法.拉手[1] === data.me) json = 位置.手引导左;
                    if (data.P5二运走法.近传递[0] === data.me) json = 位置.近传递右;
                    if (data.P5二运走法.近传递[1] === data.me) json = 位置.近传递左;
                    if (data.P5二运走法.远传递[0] === data.me) json = 位置.远传递右;
                    if (data.P5二运走法.远传递[1] === data.me) json = 位置.远传递左;
                }

                Splatoon(namespace, time, json);
                if (data.P5二运走法.世界远 === data.me) {
                    Splatoon(namespace, time, 位置.HW远2);
                }
            }
        },
        {
            id: "TOP Omega Pre-Safe Spot",
            type: "Ability",
            netRegex: {
                "id": "8015",
                "source": "オメガM",
                "capture": false
            },
            disabled: true
        },
        {
            id: 'P5 三运开始',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({id: '8015', capture: false}),
            alarmText: '超大AOE,三运开始',
            run: (data) => {
                data.P5二运on = false;
                data.P5二运 = undefined;
                data.P5二运红点名 = undefined;
                data.P5二运走法 = undefined;
                data.P5二运无点名 = undefined;
                data.P5二运塔 = undefined;
                data.P5人 = undefined;
                data.synergyMarker = {};
                data.P5二运塔方向 = undefined;
                data.P5二运我的塔 = undefined;
                data.P5二运组合技 = undefined;
                data.P5三运 = true;
                data.P5三运三传走法 = {};
                data.P5三运四传走法 = {};
                data.P5三运男女 = {
                    one: {},
                    two: {}
                };
                data.P5三运安全点 = {
                    one: {},
                    two: {}
                };
            }
        },
        //D73远
        {
            id: 'P5 三运世界近远收集',
            type: 'GainsEffect',
            netRegex: NetRegexes.gainsEffect({
                effectId: ['D73', 'D72'],
            }),
            condition: (data) => data.P5 && data.P5三运,
            run: (data, matches) => {
                let time = matches.duration;
                if (time === '32.00') {
                    if (matches.effectId === 'D73') data.P5三运三传走法.世界远 = matches.target;
                    if (matches.effectId === 'D72') data.P5三运三传走法.世界近 = matches.target;
                } else {
                    if (matches.effectId === 'D73') data.P5三运四传走法.世界远 = matches.target;
                    if (matches.effectId === 'D72') data.P5三运四传走法.世界近 = matches.target;
                }
            },
        },

        //三运男女组合技
        {
            id: 'P5 三运变身boss收集',
            type: 'Object',
            netRegex: /] ChatLog 00:0:106:(?<sourceId>(?:[^:]*)):(?<sourceName>(?:[^:]*)):0031:.{4}:.{4}0031:/,
            condition: (data) => data.P5 && data.P5三运,
            run: (data, matches) => {
                let id = parseInt(matches.sourceId, 16);
                if (data.P5变身Boss === undefined) data.P5变身Boss = [];
                data.P5变身Boss.push(id);
            },
        },
        {
            id: 'P5 三运男女组合技',
            type: 'Object',
            netRegex: /] ChatLog 00:0:106:(?<id>[0-9A-F]{8}):[^:]*(?<sex>F|M):0197:0000:00001E43:/,
            condition: (data) => data.P5 && data.P5三运 && Object.keys(data.P5三运男女.two).length < 2,
            preRun: (data, matches) => {
                let id = parseInt(matches.id, 16);
                let count = (Object.keys(data.P5三运男女.one).length >= 2) ? 'two' : 'one';
                data.P5三运男女[count][id] = {};
                data.P5三运男女[count][id].sex = matches.sex;
                data.P5三运男女[count][id].type = (data.P5变身Boss.includes(id)) ? 1 : 0;
                if (matches.sex === 'F') {
                    //女人
                    data.P5三运男女[count][id].type = (data.P5三运男女[count][id].type === 0) ? '十字' : '辣翅';
                } else {
                    //男人
                    data.P5三运男女[count][id].type = (data.P5三运男女[count][id].type === 0) ? '钢铁' : '月环';
                }
            },
            promise: async (data) => {
                if (Object.keys(data.P5三运男女.one).length === 1 || Object.keys(data.P5三运男女.two).length === 1) return
                var count = (Object.keys(data.P5三运男女.two).length >= 2) ? 'two' : 'one';

                let list = [Number(Object.keys(data.P5三运男女[count])[0]), Number(Object.keys(data.P5三运男女[count])[1])];
                let boss = await callOverlayHandler({
                    call: 'getCombatants',
                    ids: list
                });
                boss = boss.combatants;
                for (const i of boss) {
                    data.P5三运男女[count][i.ID].pos = [i.PosX, i.PosY];
                }
            },
            alertText: (data) => {
                if (Object.keys(data.P5三运男女.one).length === 1 || Object.keys(data.P5三运男女.two).length === 1) return
                var count = (Object.keys(data.P5三运男女.two).length >= 2) ? 'two' : 'one';

                //确认方位
                for (const i in data.P5三运男女[count]) {
                    let x = Math.round(data.P5三运男女[count][i].pos[0]);
                    let y = Math.round(data.P5三运男女[count][i].pos[1]);
                    if (x === 93 && y === 93) data.P5三运男女[count][i].位置 = 4;
                    if (x === 107 && y === 93) data.P5三运男女[count][i].位置 = 1;
                    if (x === 107 && y === 107) data.P5三运男女[count][i].位置 = 2;
                    if (x === 93 && y === 107) data.P5三运男女[count][i].位置 = 3;
                }


                //安全点 1男2女
                let type1, type2, pos1, pos2;
                if (data.P5三运男女[count][Object.keys(data.P5三运男女[count])[0]].sex === 'M') {
                    type1 = data.P5三运男女[count][Object.keys(data.P5三运男女[count])[0]].type;
                    type2 = data.P5三运男女[count][Object.keys(data.P5三运男女[count])[1]].type;
                    pos1 = data.P5三运男女[count][Object.keys(data.P5三运男女[count])[0]].位置;
                    pos2 = data.P5三运男女[count][Object.keys(data.P5三运男女[count])[1]].位置;
                } else {
                    type1 = data.P5三运男女[count][Object.keys(data.P5三运男女[count])[1]].type;
                    type2 = data.P5三运男女[count][Object.keys(data.P5三运男女[count])[0]].type;
                    pos1 = data.P5三运男女[count][Object.keys(data.P5三运男女[count])[1]].位置;
                    pos2 = data.P5三运男女[count][Object.keys(data.P5三运男女[count])[0]].位置;
                }

                let a = {};
                if (pos1 === 1 && pos2 === 3) {
                    if (type1 === '钢铁' && type2 === '十字') {
                        a['A'] = '远';
                        a['B'] = '远';
                    }
                    if (type1 === '钢铁' && type2 === '辣翅') {
                        a['C'] = '近';
                        a['D'] = '近';
                    }
                    if (type1 === '月环' && type2 === '十字') {
                        a['A'] = '中';
                        a['B'] = '中';
                    }
                    if (type1 === '月环' && type2 === '辣翅') {
                        a['A'] = '近';
                        a['B'] = '近';
                    }
                }
                if (pos1 === 3 && pos2 === 1) {
                    if (type1 === '钢铁' && type2 === '十字') {
                        a['C'] = '远';
                        a['D'] = '远';
                    }
                    if (type1 === '钢铁' && type2 === '辣翅') {
                        a['A'] = '近';
                        a['B'] = '近';
                    }
                    if (type1 === '月环' && type2 === '十字') {
                        a['C'] = '中';
                        a['D'] = '中';
                    }
                    if (type1 === '月环' && type2 === '辣翅') {
                        a['C'] = '近';
                        a['D'] = '近';
                    }
                }
                if (pos1 === 2 && pos2 === 4) {
                    if (type1 === '钢铁' && type2 === '十字') {
                        a['B'] = '远';
                        a['C'] = '远';
                    }
                    if (type1 === '钢铁' && type2 === '辣翅') {
                        a['A'] = '近';
                        a['D'] = '近';
                    }
                    if (type1 === '月环' && type2 === '十字') {
                        a['B'] = '中';
                        a['C'] = '中';
                    }
                    if (type1 === '月环' && type2 === '辣翅') {
                        a['B'] = '近';
                        a['C'] = '近';
                    }
                }
                if (pos1 === 4 && pos2 === 2) {
                    if (type1 === '钢铁' && type2 === '十字') {
                        a['A'] = '远';
                        a['D'] = '远';
                    }
                    if (type1 === '钢铁' && type2 === '辣翅') {
                        a['B'] = '近';
                        a['C'] = '近';
                    }
                    if (type1 === '月环' && type2 === '十字') {
                        a['A'] = '中';
                        a['D'] = '中';
                    }
                    if (type1 === '月环' && type2 === '辣翅') {
                        a['A'] = '近';
                        a['D'] = '近';
                    }
                }
                data.P5三运安全点[count] = a;

                if (count === 'one') {
                    return `找 ${Object.keys(data.P5三运安全点.one)[0]} ${Object.keys(data.P5三运安全点.one)[1]} 点`
                }
            }
        },
        //7B9C AC安全
        {
            id: 'P5 三运BOSS扇形 tts+鲶鱼精+spl',
            type: 'StartsUsing',
            netRegex: {
                id: ['7B9C', '7B9B'],
            },
            condition: (data) => data.P5 && data.P5三运,
            delaySeconds: 0.2,
            suppressSeconds: 20,
            durationSeconds: 10,
            alertText: (data, matches) => {
                let 第一次 = (matches.id === '7B9C') ? ['A', 'C'] : ['B', 'D'];
                let 第二次 = (matches.id === '7B9B') ? ['A', 'C'] : ['B', 'D'];
                let temp1 = Object.keys(data.P5三运安全点.one);
                let temp2 = Object.keys(data.P5三运安全点.two);
                第一次 = 第一次.filter(item => temp1.indexOf(item) > -1);
                第二次 = 第二次.filter(item => temp2.indexOf(item) > -1);

                data.P5三运点位temp = [第一次, data.P5三运安全点.one[第一次], 第二次, data.P5三运安全点.two[第二次]];
                let re = `先 ${第一次} ${data.P5三运安全点.one[第一次]}，后 ${第二次} ${data.P5三运安全点.two[第二次]}`;
                if (P5PostNamazu) PostNamazu('command', re);
                return re
            },
            run: (data) => {
                //画图
                const pos = {
                    A远: [100, 84],
                    A中: [100, 90],
                    A近: [100, 96.5],
                    B远: [116, 100],
                    B中: [110, 100],
                    B近: [103.5, 100],
                    C远: [100, 116],
                    C中: [100, 110],
                    C近: [100, 103.5],
                    D远: [84, 100],
                    D中: [90, 100],
                    D近: [96.5, 100],
                };

                let pos1 = pos[data.P5三运点位temp[0] + data.P5三运点位temp[1]];
                let pos2 = pos[data.P5三运点位temp[2] + data.P5三运点位temp[3]];

                const json1 = `{
					"Name": "1",
					"refX": ${pos1[0]},
					"refY": ${pos1[1]},
					"refZ": -1.907354E-06,
					"radius": 0.9,
					"color": 4293459712,
					"overlayBGColor": 3355443200,
					"overlayTextColor": 3355508480,
					"overlayVOffset": 1.5,
					"overlayFScale": 2.0,
					"thicc": 5.0,
					"overlayText": ">> 1 <<",
					"includeRotation": true
				}`;
                const json2 = `{
					"Name": "2",
					"refX": ${pos2[0]},
					"refY": ${pos2[1]},
					"refZ": -5.456968E-12,
					"radius": 0.9,
					"color": 4293459712,
					"overlayBGColor": 3355443200,
					"overlayTextColor": 3355479807,
					"overlayVOffset": 1.5,
					"overlayFScale": 2.0,
					"thicc": 5.0,
					"overlayText": ">> 2 <<",
					"includeRotation": true
				}`;
                const json3 = `{
					"Name": "",
					"type": 2,
					"refX": ${pos1[0]},
					"refY": ${pos1[1]},
					"refZ": -5.456968E-12,
					"offX": ${pos2[0]},
					"offY": ${pos2[1]},
					"offZ": -9.536798E-07,
					"radius": 0.0,
					"color": 4293459712,
					"thicc": 5.0
				}`;

                let time = '10000';
                Splatoon('P5三运前半1', time, json1);
                Splatoon('P5三运前半2', time, json2);
                Splatoon('P5三运前半3', time, json3);
            }
        },

        //大电视 7B96打右，7B97打左
        {
            id: 'P5 三传tts+标记',
            type: 'StartsUsing',
            netRegex: {
                id: ['7B97', '7B96'],
                capture: true
            },
            condition: (data) => data.P5 && data.P5三运,
            alertText: (data, matches) => {
                let temp = [data.P5三运三传走法.世界远, data.P5三运三传走法.世界近, data.P5三运四传走法.世界远, data.P5三运四传走法.世界近];
                let 剩余1 = subSet(data._party, temp);
                剩余1.sort((a, b) => {
                    return data._party.indexOf(a) - data._party.indexOf(b)
                });
                let 麻将2 = [data.P5三运四传走法.世界远, data.P5三运四传走法.世界近];
                麻将2.sort((a, b) => {
                    return data._party.indexOf(a) - data._party.indexOf(b)
                });
                let 剩余 = 麻将2.concat(剩余1);	//麻将2优先
                //找小电视引导和远传递和近传递
                data.P5三运三传走法.小电视 = [];
                data.P5三运三传走法.远传递 = [];
                data.P5三运三传走法.近传递 = [];
                for (const i of 剩余) {
                    if (data.P5潜能量[i] === 2 && data.P5三运三传走法.小电视.length < 2) {
                        data.P5三运三传走法.小电视.push(i);
                        continue
                    }
                    if (data.P5潜能量[i] === 1 && data.P5三运三传走法.远传递.length < 2) {
                        data.P5三运三传走法.远传递.push(i);
                        continue
                    }
                    data.P5三运三传走法.近传递.push(i);
                }

                let re = '';
                if (data.P5三运三传走法.世界近 === data.me)
                    re = '世界近点名，去下半场贴边';
                if (data.P5三运三传走法.世界远 === data.me)
                    re = '世界远点名，去左边靠内';
                if (data.P5三运三传走法.小电视[0] === data.me)
                    re = '小电视，去上半场左边引导';
                if (data.P5三运三传走法.小电视[1] === data.me)
                    re = '小电视，去上半场右边引导';
                if (data.P5三运三传走法.近传递[0] === data.me)
                    re = '近传递，去下半场靠内引导';
                if (data.P5三运三传走法.近传递[1] === data.me)
                    re = '近传递，去下半场贴边引导';
                if (data.P5三运三传走法.远传递[0] === data.me)
                    re = '远传递，去左边贴边';
                if (data.P5三运三传走法.远传递[1] === data.me)
                    re = '远传递，去右边贴边';

                return re
            },
            run: (data, matches) => {
                //标记
                if (!Mark.includes(5)) return
                for (const i of data._party) {
                    let name = i;
                    let mark = '';
                    if (data.P5三运三传走法.世界近 === name)
                        mark = P5三运三传标记.世界近;
                    if (data.P5三运三传走法.世界远 === name)
                        mark = P5三运三传标记.世界远;
                    if (data.P5三运三传走法.小电视[0] === name)
                        mark = P5三运三传标记.小电视左;
                    if (data.P5三运三传走法.小电视[1] === name)
                        mark = P5三运三传标记.小电视右;
                    if (data.P5三运三传走法.近传递[0] === name)
                        mark = P5三运三传标记.近传递上;
                    if (data.P5三运三传走法.近传递[1] === name)
                        mark = P5三运三传标记.近传递下;
                    if (data.P5三运三传走法.远传递[0] === name)
                        mark = P5三运三传标记.远传递左;
                    if (data.P5三运三传走法.远传递[1] === name)
                        mark = P5三运三传标记.远传递右;

                    PostNamazu('mark', {
                        Name: name,
                        MarkType: mark,
                        LocalOnly: onlyMeMarkP5,
                    });
                    console.log('三传', name, mark)
                }

                //spl点位画图
                const a = {
                    左: `~{
						"Name": "P5 三运 三传站位安全点 左",
						"Group": "绝欧js配套预设",
						"ZoneLockH": [
							1122
						],
						"ElementsL": [
							{
								"Name": "小电视 左",
								"type": 1,
								"offX": -9.54,
								"offY": 9.24,
								"radius": 0.9,
								"color": 3370712832,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "禁止1",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31639
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							},
							{
								"Name": "小电视 右",
								"type": 1,
								"offX": -9.68,
								"offY": -9.5,
								"radius": 0.9,
								"color": 3370712832,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "禁止2",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31639
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							},
							{
								"Name": "HW 远",
								"type": 1,
								"offX": 1.56,
								"offY": 9.66,
								"radius": 0.9,
								"color": 3371958527,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "攻击1",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31639
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							},
							{
								"Name": "HW 近",
								"type": 1,
								"offX": 18.18,
								"offY": 4.26,
								"radius": 0.9,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "锁链1",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31639
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							},
							{
								"Name": "远传递左",
								"type": 1,
								"offX": 1.32,
								"offY": 18.56,
								"radius": 0.9,
								"color": 3371958527,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "攻击2",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31639
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							},
							{
								"Name": "远传递右",
								"type": 1,
								"offX": 1.28,
								"offY": -18.82,
								"radius": 0.9,
								"color": 3371958527,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "攻击3",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31639
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							},
							{
								"Name": "近传递上",
								"type": 1,
								"offX": 11.02,
								"offY": -5.08,
								"radius": 0.9,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "锁链2",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31639
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							},
							{
								"Name": "近传递下",
								"type": 1,
								"offX": 17.16,
								"offY": -7.46,
								"radius": 0.9,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "锁链3",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31639
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							}
						]
					}`,
                    右: `~{
						"Name": "P5 三运 三传站位安全点 右",
						"Group": "绝欧js配套预设",
						"ZoneLockH": [
							1122
						],
						"ElementsL": [
							{
								"Name": "小电视 左",
								"type": 1,
								"offX": 9.26,
								"offY": -9.4,
								"radius": 0.9,
								"color": 3370712832,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "禁止1",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31638
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							},
							{
								"Name": "小电视 右",
								"type": 1,
								"offX": 9.3,
								"offY": 9.5,
								"radius": 0.9,
								"color": 3370712832,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "禁止2",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31638
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							},
							{
								"Name": "HW 远",
								"type": 1,
								"offX": -1.46,
								"offY": -10.26,
								"radius": 0.9,
								"color": 3371958527,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "攻击1",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31638
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							},
							{
								"Name": "远传递左",
								"type": 1,
								"offX": -1.46,
								"offY": -18.86,
								"radius": 0.9,
								"color": 3371958527,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "攻击2",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31638
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							},
							{
								"Name": "远传递右",
								"type": 1,
								"offX": -1.46,
								"offY": 18.6,
								"radius": 0.9,
								"color": 3371958527,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "攻击3",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31638
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							},
							{
								"Name": "HW 近",
								"type": 1,
								"offX": -18.1,
								"offY": -4.46,
								"radius": 0.9,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "锁链1",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31638
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							},
							{
								"Name": "近传递上",
								"type": 1,
								"offX": -11.12,
								"offY": 5.08,
								"radius": 0.9,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "锁链2",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31638
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							},
							{
								"Name": "近传递下",
								"type": 1,
								"offX": -17.26,
								"offY": 7.46,
								"radius": 0.9,
								"overlayBGColor": 4278190080,
								"overlayVOffset": 1.2,
								"thicc": 3.5,
								"overlayText": "锁链3",
								"refActorModelID": 3775,
								"refActorRequireCast": true,
								"refActorCastId": [
									31638
								],
								"refActorComparisonType": 1,
								"onlyVisible": true
							}
						]
					}`
                };
                let time = '10000';
                let namespace = 'P5三传安全点';
                let json = (matches.id === '7B96') ? a.右 : a.左;
                Splatoon(namespace, time, json);
            }
        },
        {
            id: 'P5 三传标记清除',
            type: 'Ability',
            netRegex: {id: ['7B97', '7B96']},
            condition: (data) => data.P5 && data.P5三运,
            run: () => {
                PostNamazuMarkClear();
            }
        },
        {
            id: 'P5 四传tts+标记',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({id: '7E76', capture: false}),
            condition: (data) => data.P5 && data.P5三运,
            alertText: (data) => {
                //拉线
                data.P5三运四传走法.拉线 = [];
                data.P5三运四传走法.远传递 = [];
                data.P5三运四传走法.近传递 = [];
                let 剩余 = subSet(data._party, [data.P5三运四传走法.世界远, data.P5三运四传走法.世界近]);
                剩余.sort((a, b) => {
                    return data._party.indexOf(a) - data._party.indexOf(b)
                });
                for (const i of 剩余) {
                    if (data.P5潜能量[i] === 3 && data.P5三运四传走法.拉线.length < 2) {
                        data.P5三运四传走法.拉线.push(i);
                        continue
                    }
                    if (data.P5三运四传走法.远传递.length < 2) {
                        data.P5三运四传走法.远传递.push(i);
                        continue
                    }
                    data.P5三运四传走法.近传递.push(i);
                }

                let re = '';
                if (data.P5三运四传走法.世界近 === data.me)
                    re = '世界近点名，去下半场贴边';
                if (data.P5三运四传走法.世界远 === data.me)
                    re = '世界远点名，去左边靠内';
                if (data.P5三运四传走法.拉线[0] === data.me)
                    re = '拉线，去上半场左边贴边';
                if (data.P5三运四传走法.拉线[1] === data.me)
                    re = '拉线，去上半场右边贴边';
                if (data.P5三运四传走法.近传递[0] === data.me)
                    re = '近传递，去下半场靠内引导';
                if (data.P5三运四传走法.近传递[1] === data.me)
                    re = '近传递，去下半场贴边引导';
                if (data.P5三运四传走法.远传递[0] === data.me)
                    re = '远传递，去左边贴边';
                if (data.P5三运四传走法.远传递[1] === data.me)
                    re = '远传递，去右边贴边';

                return re
            },
            run: (data) => {
                //标记
                if (!Mark.includes(5)) return
                for (const i of data._party) {
                    let name = i;
                    let mark = '';
                    if (data.P5三运四传走法.世界近 === name)
                        mark = P5三运三传标记.世界近;
                    if (data.P5三运四传走法.世界远 === name)
                        mark = P5三运三传标记.世界远;
                    if (data.P5三运四传走法.拉线[0] === name)
                        mark = P5三运三传标记.小电视左;
                    if (data.P5三运四传走法.拉线[1] === name)
                        mark = P5三运三传标记.小电视右;
                    if (data.P5三运四传走法.近传递[0] === name)
                        mark = P5三运三传标记.近传递上;
                    if (data.P5三运四传走法.近传递[1] === name)
                        mark = P5三运三传标记.近传递下;
                    if (data.P5三运四传走法.远传递[0] === name)
                        mark = P5三运三传标记.远传递左;
                    if (data.P5三运四传走法.远传递[1] === name)
                        mark = P5三运三传标记.远传递右;

                    PostNamazu('mark', {
                        Name: name,
                        MarkType: mark,
                        LocalOnly: onlyMeMarkP5,
                    });
                    console.log('四传', name, mark)
                }
            }
        },
        {
            id: 'P5 死刑',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({id: ['81AC', '81AD'], capture: false}),
            condition: (data) => data.P5 && data.party.isRole(data.me, 'tank'),
            alertText: '死刑'
        },
        {
            id: 'P5 狂暴',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({id: '7B87', capture: false}),
            condition: (data) => data.P5 && data.P5三运,
            alarmText: 'P5狂暴',
            run: (data) => {
                data.P5潜能量 = undefined;
                data.P5二运后半转转 = undefined;
                data.P5三运 = false;
                data.P5 = false;
                data.P5三运三传走法 = undefined;
                data.P5三运四传走法 = undefined;
                data.P5三运男女 = undefined;
                data.P5三运安全点 = undefined;
                data.P5变身Boss = undefined;
                data.P5三运点位temp = undefined;
                data.P6 = true;
            }
        },


        //P6
        {
            id: 'P6 宇宙记忆',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({id: '7BA1', capture: false}),
            condition: (data) => data.P6,
            alertText: 'TLB',
            run: (data) => {
                data.P6射手天箭 = 0;
                data.P6count = 1;
                data.P6陨石 = {};
                data.P6步进 = [];
                data.P6地火 = [];
                data.P6天箭开关 = true;
            }
        },
        {
            id: 'P6 射手天箭后',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: ['7BA2']
            }),
            condition: (data) => data.P6,
            suppressSeconds: 10,
            alertText: (data) => {
                if (data.P6count === 1) {
                    //第一轮
                    if (data.role === 'tank') {
                        return '射手天箭后，双T死刑靠近'
                    } else {
                        return '射手天箭后，人群集合远离'
                    }

                } else {
                    //第二轮
                    return '射手天箭后，八方分散'
                }
            },
        },

        //射手天箭
        {
            id: 'P6 射手天箭次数开关',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: ['7BA3']
            }),
            condition: (data) => data.P6,
            suppressSeconds: 10,
            delaySeconds: 1,
            run: (data) => {
                data.P6天箭开关 = false;
                if (data.P6步进.length === 2) {
                    data.P6射手天箭 = '先十'
                } else {
                    data.P6射手天箭 = '先口'
                }
            }
        },
        {
            id: 'P6 射手天箭收集',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: ['7BA3']
            }),
            condition: (data) => data.P6 && data.P6天箭开关,
            run: (data, matches) => {
                data.P6步进.push([matches.x, matches.y]);
            },
        },
        {
            id: 'P6 射手天箭1穿',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: ['7BA3']
            }),
            condition: (data) => data.P6,
            suppressSeconds: 30,
            delaySeconds: 7,
            durationSeconds: 2,
            alertText: '1穿',
            run: (data) => {
                let namespace = 'P6 射手天箭1穿';
                let time = '5000';
                let json = (data.P6射手天箭 === '先十') ? 射手天箭.内圈4 : 射手天箭.外圈4;
                Splatoon(namespace, time, json);
            }
        },
        {
            id: 'P6 射手天箭2穿',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: ['7BA3']
            }),
            condition: (data) => data.P6,
            suppressSeconds: 30,
            delaySeconds: 10,
            durationSeconds: 2,
            alertText: '2停',
        },
        {
            id: 'P6 射手天箭3穿',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: ['7BA3']
            }),
            condition: (data) => data.P6,
            suppressSeconds: 30,
            delaySeconds: 12,
            durationSeconds: 2,
            alertText: '3穿',
            run: (data) => {
                let json;
                if (data.P6射手天箭 === '先口') {
                    json = 射手天箭.中等4
                } else {
                    if (data.P6count === 1) {
                        json = 射手天箭.外圈4
                    } else {
                        json = 射手天箭.外圈4_8
                    }
                }
                let namespace = 'P6 射手天箭3穿';
                let time = (data.P6射手天箭 === '先十') ? '4000' : '2000';
                Splatoon(namespace, time, json);
            }
        },
        {
            id: 'P6 射手天箭4穿',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: ['7BA3']
            }),
            condition: (data) => data.P6,
            suppressSeconds: 30,
            delaySeconds: 14,
            durationSeconds: 2,
            alertText: (data) => {
                if (data.P6射手天箭 === '先十') {
                    return '4停'
                } else {
                    let namespace = 'P6 射手天箭4穿';
                    let time = '2000';
                    let json = 射手天箭.外圈8;
                    Splatoon(namespace, time, json);
                    return '4穿'
                }
            },
        },
        {
            id: 'P6 射手天箭5穿',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: ['7BA3']
            }),
            condition: (data) => data.P6,
            suppressSeconds: 30,
            delaySeconds: 16,
            durationSeconds: 2,
            alertText: '5穿',
            run: (data) => {
                let namespace = 'P6 射手天箭5穿';
                let time = (data.P6射手天箭 === '先口') ? '4000' : '2000';
                let json = (data.P6射手天箭 === '先十') ? 射手天箭.外圈8 : 射手天箭.中等8;
                Splatoon(namespace, time, json);
            }
        },
        {
            id: 'P6 射手天箭6穿',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: ['7BA3']
            }),
            condition: (data) => data.P6,
            suppressSeconds: 30,
            delaySeconds: 18,
            durationSeconds: 2,
            alertText: (data) => {
                var re = '';
                if (data.P6count === 1) {
                    if (data.role === 'tank') {
                        re = '，死刑分散'
                    } else {
                        re = '，集合远离'
                    }
                } else {
                    re = '后分散，然后激光分摊'
                }

                if (data.P6射手天箭 === '先十') {
                    let namespace = 'P6 射手天箭6穿';
                    let time = '2000';
                    let json = 射手天箭.中等8;
                    Splatoon(namespace, time, json);
                    return '6穿' + re
                } else {
                    return '6停' + re
                }
            },
        },
        //

        {
            id: 'P6 地火',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({
                id: ['7BAD']
            }),
            duration: 10,
            preRun: (data, matches) => {
                data.P6地火.push([matches.x, matches.y])
            },
            alertText: (data) => {
                const pos = {
                    '100,76': '上',
                    '100,124': '下',
                    '76,100': '左',
                    '124,100': '右',
                    '83,83': '左上',
                    '83,117': '左下',
                    '117,83': '右上',
                    '117,117': '右下',
                };
                if (data.P6地火.length === 2) {
                    let 顺逆 = math.向量夹角(data.P6地火[0], data.P6地火[1]) > 0 ? '顺时针' : '逆时针';
                    let 第一次地火 = data.P6地火[0];
                    let 安全角度 = 顺逆 === '顺时针' ? -67.5 : 67.5;
                    let spl角度 = 顺逆 === '顺时针' ? 45 : -45;
                    let 安全点 = math.向量求点(顺逆 === '顺时针' ? -45 : 45, 24, 第一次地火);
                    let 安全点spl = math.向量求点(安全角度, 17.3, 第一次地火);
                    let 安全点spl2 = math.向量求点(spl角度, 17.3, 安全点spl);

                    //spl画图
                    let json = `~{
						"Name": "P6地火画图",
						"Group": "",
						"ZoneLockH": [
							1122
						],
						"ElementsL": [
							{
								"Name": "1",
								"refX": ${安全点spl[0]},
								"refY": ${安全点spl[1]},
								"refZ": -5.456968E-12,
								"radius": 2.06,
								"color": 3369860864,
								"thicc": 5.0,
								"tether": true
							},
							{
								"Name": "2",
								"refX": ${安全点spl2[0]},
								"refY": ${安全点spl2[1]},
								"refZ": -5.456968E-12,
								"radius": 2.06,
								"color": 3369860864,
								"thicc": 5.0
							},
							{
								"Name": "线",
								"type": 2,
								"refX": ${安全点spl[0]},
								"refY": ${安全点spl[1]},
								"refZ": 1.9073432E-06,
								"offX": ${安全点spl2[0]},
								"offY": ${安全点spl2[1]},
								"offZ": -5.456968E-12,
								"radius": 0.0,
								"color": 3369860864,
								"thicc": 5.0
							}
						]
					}`;
                    let time = '20000';
                    Splatoon('P6地火', time, json);

                    安全点 = [Math.round(安全点[0]), Math.round(安全点[1])].toString();
                    console.log('安全点: ', 安全点);
                    return `中间集合，然后去${pos[安全点]}，${顺逆}`;
                }
            },
        },
        {
            id: 'P6 地火结束',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({id: ['7BAC']}),
            delaySeconds: 20,
            alertText: (data) => {
                if (data.P6count === 1) {
                    return '回场中，八方分散后，激光分摊'
                } else {
                    if (data.role === 'tank') {
                        return '回场中，双T死刑靠近'
                    } else {
                        return '回场中，人群集合远离，近战LB两次'
                    }
                }
            },
            run: (data) => {
                data.P6count++;
                data.P6地火 = [];
                data.P6步进 = [];
                data.P6天箭开关 = true;
            }
        },

        //陨石
        {
            id: 'P6 陨石tts',
            type: 'HeadMarker',
            netRegex: {},
            condition: (data, matches) => data.P6 && getHeadmarkerId(data, matches) === '015A',
            promise: async (data, matches) => {
                const boss = await callOverlayHandler({
                    call: 'getCombatants',
                    ids: [parseInt(matches.targetId, 16)],
                });
                data.P6陨石[matches.target] = [boss.combatants[0].PosX, boss.combatants[0].PosY];
            },
            alarmText: (data) => {
                if (Object.keys(data.P6陨石).length !== 3) return

                let is远敏 = false;
                let name = '';
                for (const i in data.P6陨石) {
                    let job = nametocnjob(i, data);
                    if (['诗人', '舞者', '机工'].includes(job)) {
                        is远敏 = true;
                        name = i;
                        break
                    }
                }

                let _myjob = nametocnjob(data.me, data);
                if (['诗人', '舞者', '机工'].includes(_myjob)) return '原地不动'

                if (Object.keys(data.P6陨石).includes(data.me)) {
                    //点名的三人
                    let temp = []
                    for (const i in data.P6陨石) {
                        if (name !== i) {
                            temp.push([data.P6陨石[i][0], data.P6陨石[i][1], i])
                        }
                    }
                    temp.sort((a, b) => {
                        return a[0] - b[0]
                    });
                    if (temp[0][2] === data.me) return '去左D点放陨石'
                    if (temp[temp.length - 1][2] === data.me) return '去右B点放陨石'
                    return '去下C点放陨石'
                } else {
                    //未被点名
                    if (is远敏) {
                        if (P6PostNamazu) {
                            PostNamazu('command', '/p 人群C点');
                        }
                        return '去下C点集合'
                    } else {
                        if (P6PostNamazu) {
                            PostNamazu('command', '/p 人群A点');
                        }
                        return '去上A点集合'
                    }
                }


            },
        },


        //rushB！
        {
            id: 'P6 陨石',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({id: ['7BB0']}),
            alertText: '场中集合，然后八方散开'
        },
        {
            id: 'P6 法系LB',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({id: ['7BB0']}),
            delaySeconds: 7,
            alertText: '法系LB，然后远敏LB'
        },
        {
            id: 'P6 THLB1',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({id: ['7BB0']}),
            delaySeconds: 36,
            alertText: 'T LB后，奶妈LB'
        },
        {
            id: 'P6 THLB2',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({id: ['7BB0']}),
            delaySeconds: 52,
            alertText: 'T LB后，奶妈LB'
        },
        {
            id: 'P6 狂暴',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({id: ['7BA0']}),
            promise: async (data, matches) => {
                let boss = await callOverlayHandler({
                    call: 'getCombatants',
                    ids: [parseInt(matches.sourceId, 16)],
                });
                boss = boss.combatants[0];
                data.P6hp = boss.CurrentHP / boss.MaxHP;
            },
            alertText: '最终狂暴!! 近战LB'
        },
        {
            id: 'P6 过本',
            type: 'StartsUsing',
            netRegex: NetRegexes.startsUsing({id: ['7BA0']}),
            delaySeconds: 3,
            alarmText: (data) => (data.P6hp <= 0.135) ? '兄弟们相信我这把整活了！这都不过我把欧米茄吃下去' : '我操你妈！寄！回伽下一把'
        },


        //禁用的触发器
        {
            id: 'TOP Swivel Cannon',
            type: 'StartsUsing',
            netRegex: {id: ['7B94', '7B95'], source: 'Omega'},
            disabled: true
        },
        {
            id: 'TOP Sigma Omega-M Location',
            type: 'Ability',
            netRegex: {id: '8014', source: 'Omega-M'},
            disabled: true
        },
        {
            id: 'TOP P5 Sigma Debuffs',
            type: 'Ability',
            netRegex: {id: '7B04', capture: false},
            disabled: true,
            condition: (data) => data.phase === 'sigma',
        },
        {
            id: 'TOP Sigma Superliminal/Blizzard',
            type: 'Ability',
            netRegex: {id: '7B2E', source: 'Omega-M'},
            disabled: true,
            condition: (data) => data.phase === 'sigma',
        },
        {
            id: 'TOP Omega Safe Spots',
            type: 'StartsUsing',
            netRegex: {id: ['7B9B', '7B9C'], source: 'Omega'},
            disabled: true,
            durationSeconds: (_data, matches) => parseFloat(matches.castTime),
        },
        {
            id: 'TOP Omega Safe Spot 2 Reminder',
            type: 'StartsUsing',
            disabled: true,
            netRegex: {id: ['7B9B', '7B9C'], source: 'Omega'},
        },
        {
            id: 'TOP P5 Omega Debuffs',
            type: 'GainsEffect',
            netRegex: {effectId: ['D72', 'D73']},
            disabled: true,
            condition: (data, matches) => data.phase === 'omega' && matches.target === data.me,
        },
        {
            id: 'TOP P5 Omega Tether Bait',
            type: 'GainsEffect',
            netRegex: {effectId: 'D74', count: '03'},
            disabled: true,
            condition: (data, matches) => data.phase === 'omega' && matches.target === data.me,
        }
    ],
});