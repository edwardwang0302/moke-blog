import React from 'react';
import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const Experiences = [
  {
    img: 'img/about/1.png',
    time: '2018/08—2020/06',
    department: '阿里巴巴 菜鸟',
    descriptions: [
      '大快递驿站商业化洗衣业务掌柜端与C端H5页面的开发',
      '大快递驿站商业化团购业务C端H5与微信小程序的开发',
      '内部钉钉微应用运营服务反馈平台”看见听见“的开发',
      '开发菜鸟FAAS平台”Micro“，接合WebIDE在线编辑，简单应用一站式开发部署服务',
      '参与维护菜鸟前端平台和组件，如Tars消息通知平台和Walle公共组件'
    ]
  },
  {
    img: 'img/about/2.png',
    time: '2015/07—2018/08',
    department: '阿里巴巴 AliOS(云OS)',
    descriptions: [
      '云雀测试平台开发与维护，接合Echarts可视化图表从不同维度对测试数据进行归类与监控展示',
      'AliOS开发者网站开发维护，AliOS IDE开发工作'
    ],
  },
];

function ExpItem({ inversed, img, time, department, descriptions }) {
  return (
    <li className={inversed ? styles["timeline-inverted"] : ''} >
      <div className={styles["timeline-image"]}>
        <img className={[styles["rounded-circle"], styles["img-fluid"]].join(' ')} src={useBaseUrl(img)} alt="" />
      </div>
      <div className={styles["timeline-panel"]}>
        <div className={styles["timeline-heading"]}>
          <h4>{time}</h4>
          <h4 className={styles["subheading"]}>{department}</h4>
        </div>
        {
          descriptions.map(desc => (
            <div className={styles["timeline-body"]}>
              <p className={styles["text-muted"]}>{desc}</p>
            </div>    
          ))
        }
      </div>
    </li>
  )
}

function About() {
  return (
    <Layout title="About">
      <section className={[styles["page-section"], styles["bg-light"]].join} id="team">
        <div className={styles.container}>
          <div className={styles["text-center"]}>
            <h2 className={[styles["section-heading"], styles["text-uppercase"]].join(' ')}>Stay humble,Stay hungry</h2>
            {/* <h3 className={[styles["section-subheading"], styles["text-muted"]].join(' ')}>Lorem ipsum dolor sit amet consectetur.</h3> */}
          </div>
          <div className={styles.row}>
            <div className={styles["col-lg-4"]} style={{margin: '0 auto'}}>
              <div className={styles["team-member"]}>
                <img className={styles["team-member-img"], [styles["mx-auto"], styles["rounded-circle"]].join(' ')} src={useBaseUrl("img/about/avatar.png")} alt="" />
                <h4 className={styles["team-member-h4"]}>王宇（莫珂）</h4>
                <p className={styles["text-muted"]}>热爱工作爱钻研，爱好数码与摄影，B站UP主</p>
                {/* <a className={[styles.btn, styles["btn-dark"], styles["btn-social"], styles["mx-2"]].join(' ')} href="#!">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className={[styles.btn, styles["btn-dark"], styles["btn-social"], styles["mx-2"]].join(' ')} href="#!">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className={[styles.btn, styles["btn-dark"], styles["btn-social"], styles["mx-2"]].join(' ')} href="#!">
                  <i className="fab fa-linkedin-in"></i>
                </a> */}
              </div>
            </div>
          </div>
          <div className={styles.row}>
            <div className={[styles["col-lg-8"], styles["mx-auto"], styles["text-center"]].join(' ')}>
              <p className={[styles["large"], styles["text-muted"]].join(' ')}>
                我是莫珂，一名92年前端开发工程师，毕业于西安邮电大学，本科计算机科学与技术专业。过去5年曾在Alibaba公司从事前端开发。擅长使用React技术栈，能够快速开发业务需求提炼可复用的组件。同时了解Vue，Electron，NodeJS，有EggJS框架开发Node后台应用和MpVue开发微信小程序经验。
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles["page-section"]} id="about">
        <div className={styles.container}>
          <div className={styles["text-center"]}>
              <h2 className={[styles["section-heading"], styles["text-uppercase"]].join(' ')}>工作履历</h2>
              {/* <h3 className={[styles["section-subheading"], styles["text-muted"]].join(' ')}>在阿里巴巴集团工作5年</h3> */}
          </div>
          <ul className={styles.timeline}>
            {
              Experiences.map((expItem, index) => <ExpItem inversed={index % 2 === 0} {...expItem} />)
            }
            {/* <li>
              <div className={styles["timeline-image"]}>
                <img className={[styles["rounded-circle"], styles["img-fluid"]].join(' ')} src={useBaseUrl('img/about/1.jpg')} alt="" />
              </div>
              <div className={styles["timeline-panel"]}>
                <div className={styles["timeline-heading"]}>
                  <h4>2009-2011</h4>
                  <h4 className={styles["subheading"]}>Our Humble Beginnings</h4>
                </div>
                <div className={styles["timeline-body"]}>
                  <p className={styles["text-muted"]}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p>
                </div>
              </div>
            </li>
            <li className={styles["timeline-inverted"]}>
              <div className={styles["timeline-image"]}>
                <img className={[styles["rounded-circle"], styles["img-fluid"]].join(' ')} src={useBaseUrl('img/about/2.jpg')} alt="" />
              </div>
              <div className={styles["timeline-panel"]}>
                <div className={styles["timeline-heading"]}>
                  <h4>March 2011</h4>
                  <h4 className={styles.subheading}>An Agency is Born</h4>
                </div>
                <div className={styles["timeline-body"]}>
                  <p className={styles["text-muted"]}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles["timeline-image"]}>
                <img className={[styles["rounded-circle"], styles["img-fluid"]].join(' ')} src={useBaseUrl('img/about/3.jpg')} alt="" />
              </div>
              <div className={styles["timeline-panel"]}>
                <div className={styles["timeline-heading"]}>
                  <h4>December 2012</h4>
                  <h4 className={styles["subheading"]}>Transition to Full Service</h4>
                </div>
                <div className={styles["timeline-body"]}>
                  <p className={styles["text-muted"]}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p>
                </div>
              </div>
            </li>
            <li className={styles["timeline-inverted"]}> */}
              {/* <div className={styles["timeline-image"]}>
                <img className={[styles["rounded-circle"], styles["img-fluid"]].join(' ')} src={useBaseUrl('img/about/4.jpg')} alt="" />
              </div>
              <div className={styles["timeline-panel"]}>
                <div className={styles["timeline-heading"]}>
                  <h4>July 2014</h4>
                  <h4 className={styles["subheading"]}>Phase Two Expansion</h4>
                </div>
                <div className={styles["timeline-body"]}>
                <p className={styles["text-muted"]}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!</p>
                </div>
              </div>
            </li> */}
            {/* <li className={styles["timeline-inverted"]}>
              <div className={styles["timeline-image"]}>
                <h4>未完<br />待续<br />Fight!</h4>
              </div>
            </li> */}
          </ul>
        </div>
      </section>
    </Layout>
  );
}

export default About;