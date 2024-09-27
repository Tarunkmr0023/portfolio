import React from 'react';
import styles from "./Experience.module.css";
import skills from "../../data/skills.json";
import { getImageUrl } from '../../utils';
import experiences from "../../data/experience.json";

export const Experience = () => {
  return (
    <section className={styles.container}  id="experience">
        <h2 className={styles.title}>Experience</h2>
        <div className={styles.content}>
            <div  className={styles.skills}>
                {skills.map((skill, id) => {
                    return (
                        <div key={id} className={styles.skill}>
                            <div className={styles.skillImageContainer}>
                                <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
                            </div>
                            <p>{skill.title}</p>
                        </div>
                    );
                })}
            </div>
            <ul className={styles.experience}>
                {experiences.map((experience, id) => {
                    return (
                    <li key={id} className={styles.experienceItem}>
                        <img width={"5%"} src={getImageUrl(experience.imageSrc)} alt={`${experience.organisation} Logo`} style={{borderRadius: "5px"}}/>
                        <div className={styles.experienceItemDetails}>
                            <h3>{`${experience.role}, ${experience.organisation}`}</h3>
                            <p>{`${experience.startDate} - ${experience.endDate}`}</p>
                            <ul>
                               {experience.tasks.map((task, id) => {
                                return <li key={id}>{task}</li>
                               })}
                            </ul>
                        </div>
                    </li> 
                    );
                })
            }
            </ul>
        </div>
    </section>
  )
}
