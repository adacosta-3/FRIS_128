CREATE TABLE role_rank (
                           role_rank_id SERIAL PRIMARY KEY,
                           role_rank_name VARCHAR(100) NOT NULL,
                           is_approver BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE "user" (
                        user_id SERIAL PRIMARY KEY,
                        username TEXT UNIQUE NOT NULL,
                        password_hash TEXT NOT NULL,
                        is_active BOOLEAN DEFAULT TRUE,
                        last_login TIMESTAMP,
                        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        first_name VARCHAR(100) NOT NULL,
                        last_name VARCHAR(100) NOT NULL,
                        email VARCHAR(255) UNIQUE NOT NULL,
                        phone_number VARCHAR(20),
                        unit VARCHAR(100),
                        department VARCHAR(100),
                        college VARCHAR(100)
);

CREATE TABLE user_roles (
                            user_role_id SERIAL PRIMARY KEY,
                            user_id INT REFERENCES "user"(user_id),
                            role_rank_id INT REFERENCES role_rank(role_rank_id),
                            college TEXT,
                            department TEXT,
                            is_primary BOOLEAN DEFAULT FALSE
);

-- Test Case 1: Insert Role Ranks
-- FIll in the different roles/ranks that workers can have in UP Manila

INSERT INTO role_rank (role_rank_name, is_approver) VALUES
                                                        ('OVCR', TRUE),
                                                        ('Chancellor', TRUE),
                                                        ('Vice Chancellor', TRUE),
                                                        ('Dean', TRUE),
                                                        ('Associate Dean', TRUE),
                                                        ('Department Chairperson', TRUE),
                                                        ('Program Coordinator', TRUE),
                                                        ('Faculty', FALSE),
                                                        ('Administrative Staff', FALSE),
                                                        ('College Secretary', FALSE);

-- Test Case 2: Create Users
-- 9 users: complete for the approval path to work

-- hashed_pw0 -> 9

-- hashed_pw0
-- OVCR (Office of the Vice Chancellor for Research)
INSERT INTO "user" (username, password_hash, first_name, last_name, email, phone_number)
VALUES ('ovcr1', '$2a$12$puL6I0W2/P.VNP.OsZvnJOvqf/DEl9fObN5VRQDe.OvtqqhY8GAWS', 'Oscar', 'Velasco', 'ovcr@up.edu.ph', '09170000000');

-- hashed_pw1
-- Chancellor
INSERT INTO "user" (username, password_hash, first_name, last_name, email, phone_number)
VALUES ('chancellor1', '$2a$12$caCMtwHiXSJqmkFMCdk10.f2rI/6IibOXOohi0NEu/MrRxjwRkkNS', 'Carmen', 'Rivera', 'crivera@up.edu.ph', '09170000001');

-- hashed_pw2
-- Vice Chancellor
INSERT INTO "user" (username, password_hash, first_name, last_name, email, phone_number)
VALUES ('vc1', '$2a$12$UAbIf8vVuZjfZ8LcubxDIu7.surzHefjQfL6fPgSGO8kDZLk/gGKG', 'Victor', 'Cuevas', 'vcuevas@up.edu.ph', '09170000002');

-- hashed_pw3
-- Dean (CAS)
INSERT INTO "user" (username, password_hash, first_name, last_name, email, phone_number, college)
VALUES ('dean1', '$2a$12$5NHTN0c4D3OtbxeWSGJ7IOZ80i3ganVx3ioPCJJXOPnwfru/JciZO', 'Diana', 'Lopez', 'dlopez@up.edu.ph', '09170000003', 'CAS');

-- hashed_pw4
-- Associate Dean (CAS)
INSERT INTO "user" (username, password_hash, first_name, last_name, email, phone_number, college)
VALUES ('assocdean1', '$2a$12$5gCi98n66dWPUoeHYGsfJOigYyS2u6yuyWFqi15.1WpcZYSvcsNga', 'Anton', 'Garcia', 'agarcia@up.edu.ph', '09170000004', 'CAS');

-- hashed_pw5
-- Department Chairperson (DPSM)
INSERT INTO "user" (username, password_hash, first_name, last_name, email, phone_number, department, college)
VALUES ('chair1', '$2a$12$WG8hAHWOR5NTot36/5NajuHj6dNCGo26ZymdmCu9GC03atj4qkWgi', 'Maria', 'Reyes', 'mreyes@up.edu.ph', '09170000005', 'DPSM', 'CAS');

-- hashed_pw6
-- Program Coordinator (BS CS)
INSERT INTO "user" (username, password_hash, first_name, last_name, email, phone_number, department, college)
VALUES ('coor1', '$2a$12$Mctt.k32r/Tp.QH0Mk45seDyDNuLOcKInYLM4VqeYiUW.xvSWF3tK', 'Leo', 'Mendoza', 'lmendoza@up.edu.ph', '09170000006', 'DPSM', 'CAS');

-- hashed_pw7
-- Faculty
INSERT INTO "user" (username, password_hash, first_name, last_name, email, phone_number, department, college)
VALUES ('faculty1', '$2a$12$5uMHJs0CHEaDVdh9AykJEuk6cRwc7Ro90.VXMmJNQeYgY7MP8fzU.', 'Juan', 'Dela Cruz', 'jdelacruz@up.edu.ph', '09170000007', 'DPSM', 'CAS');

-- hashed_pw8
-- Administrative Staff
INSERT INTO "user" (username, password_hash, first_name, last_name, email, phone_number, department)
VALUES ('adminstaff1', '$2a$12$278TYqXKlN1/tCgwJASyvup57NPtSG.qTz5CPj6Q10ZCN8YiuzdNO', 'Leo', 'Domingo', 'ldomingo@up.edu.ph', '09170000008', 'OUR');

-- hashed_pw9
-- College Secretary
INSERT INTO "user" (username, password_hash, first_name, last_name, email, phone_number, college)
VALUES ('secretary1', '$2a$12$34UQRuLnwRSDHUQjwbFl4.BhG/aGcfLrDorAFMeAkmRl04DDlO0UK', 'Joan', 'Navarro', 'jnavarro@up.edu.ph', '09170000009', 'CAS');

-- Test Case 3: Assign User Roles
-- Assign specific roles to the users that were made in TC2

-- 1. OVCR (Oscar Velasco)
INSERT INTO user_roles (user_id, role_rank_id, is_primary)
VALUES (1, 1, TRUE);

-- 2. Chancellor (Carmen Rivera)
INSERT INTO user_roles (user_id, role_rank_id, is_primary)
VALUES (2, 2, TRUE);

-- 3. Vice Chancellor (Victor Cuevas)
INSERT INTO user_roles (user_id, role_rank_id, is_primary)
VALUES (3, 3, TRUE);

-- 4. Dean (Diana Lopez - CAS)
INSERT INTO user_roles (user_id, role_rank_id, college, is_primary)
VALUES (4, 4, 'CAS', TRUE);

-- 5. Associate Dean (Anton Garcia - CAS)
INSERT INTO user_roles (user_id, role_rank_id, college, is_primary)
VALUES (5, 5, 'CAS', TRUE);

-- 6. Department Chairperson (Maria Reyes - DPSM, CAS)
INSERT INTO user_roles (user_id, role_rank_id, department, college, is_primary)
VALUES (6, 6, 'DPSM', 'CAS', TRUE);

-- 7. Program Coordinator (Leo Mendoza - DPSM, CAS)
INSERT INTO user_roles (user_id, role_rank_id, department, college, is_primary)
VALUES (7, 7, 'DPSM', 'CAS', TRUE);

-- 8. Faculty (Juan Dela Cruz - DPSM, CAS)
INSERT INTO user_roles (user_id, role_rank_id, department, college, is_primary)
VALUES (8, 8, 'DPSM', 'CAS', TRUE);

-- 9. Administrative Staff (Leo Domingo - OUR)
INSERT INTO user_roles (user_id, role_rank_id, department, is_primary)
VALUES (9, 9, 'OUR', TRUE);

-- 10. College Secretary (Joan Navarro - CAS)
INSERT INTO user_roles (user_id, role_rank_id, college, is_primary)
VALUES (10, 10, 'CAS', TRUE);

-- Test Case 4: Seed Academic and Professional Data
-- Academic and professional background data for Juan Dela Cruz (assumed, user_id = 8)

INSERT INTO educational_background (user_id, degree, school, graduation_year, degree_type)
VALUES
    (8, 'BS Computer Science', 'University of the Philippines Manila', 2020, 'Bachelor');

INSERT INTO educational_background (user_id, degree, school, graduation_year, degree_type)
VALUES
    (8, 'BS Computer Science', 'University of the Philippines Manila', 2020, 'Bachelor');

INSERT INTO research_interests (user_id, research_interest)
VALUES
    (8, 'Machine Learning for Healthcare'),
    (8, 'Data Privacy and Ethics');

INSERT INTO affiliations (user_id, affiliation_name, affiliation_type)
VALUES
    (8, 'Philippine Society for Data Science', 'Professional Organization');

-- Test Case 5: Publication Types
INSERT INTO publication_type (type_name, subtype_name) VALUES
-- Publications
('Publication', 'International publication journal with impact factor'),
('Publication', 'International publication without impact factor'),

-- Other Publications
('Other Publication', 'Monographs (reputable international publisher)'),
('Other Publication', 'Book/e-book; chapter in book/e-book (reputable international publisher)'),
('Other Publication', 'Book/e-book; chapter in book/e-book (reputable national publisher)'),
('Other Publication', 'International conference proceedings'),
('Other Publication', 'National conference proceedings'),
('Other Publication', 'Book/e-book; chapter in book/e-book (international publisher)'),
('Other Publication', 'Article in national scientific journal'),
('Other Publication', 'Book/chapter in book (national publisher)'),
('Other Publication', 'International conference proceedings'),
('Other Publication', 'National conference proceedings'),

-- Projects
('Project', 'Php 100,000 - 500,000'),
('Project', 'Php 500,001 - 1,000,000'),
('Project', 'Php 1,000,001 - 10,000,000'),
('Project', 'Php > 10,000,000'),

-- Conference Presentations 4.x
('Conference Presentation', 'Plenary talk/keynote presentation'),
('Conference Presentation', 'Invited talk (Scientific conference)'),
('Conference Presentation', 'Invited talk (Academic Administrator''s Conference)'),
('Conference Presentation', 'Contributed paper (oral/poster)'),
('Local Presentation', 'Plenary talk/keynote presentation'),
('Local Presentation', 'Invited talk (Scientific conference)'),
('Local Presentation', 'Invited talk (Academic Administrator''s Conference)'),
('Local Presentation', 'Contributed paper (oral/poster)'),

-- Intellectual Property Claims
('Intellectual Property Claim', 'Awarded patent/utility Models with multinational jurisdiction'),
('Intellectual Property Claim', 'Formally lodged multinational copyright'),
('Intellectual Property Claim', 'Philippine/Single country lodged copyright'),
('Intellectual Property Claim', 'Patented trademark (international/national)');
-- Test Case 6: SDG and SDG Targets

-- TC6: Insert all 17 official UN SDGs (main goals)
INSERT INTO sdg (sdg_name) VALUES
                               ('Goal 1: No Poverty'),
                               ('Goal 2: Zero Hunger'),
                               ('Goal 3: Good Health and Well-being'),
                               ('Goal 4: Quality Education'),
                               ('Goal 5: Gender Equality'),
                               ('Goal 6: Clean Water and Sanitation'),
                               ('Goal 7: Affordable and Clean Energy'),
                               ('Goal 8: Decent Work and Economic Growth'),
                               ('Goal 9: Industry, Innovation and Infrastructure'),
                               ('Goal 10: Reduced Inequality'),
                               ('Goal 11: Sustainable Cities and Communities'),
                               ('Goal 12: Responsible Consumption and Production'),
                               ('Goal 13: Climate Action'),
                               ('Goal 14: Life Below Water'),
                               ('Goal 15: Life on Land'),
                               ('Goal 16: Peace, Justice and Strong Institutions'),
                               ('Goal 17: Partnerships for the Goals');

-- TC6: Sample sdg_targets (subgoals) referencing sdg (main goals)
INSERT INTO sdg_targets (sdg_id, sdg_target_name) VALUES
                                                      (1, 'Eradicate extreme poverty for all people everywhere'),
                                                      (2, 'End hunger and ensure access to safe, nutritious food'),
                                                      (3, 'Ensure healthy lives and promote well-being for all'),
                                                      (4, 'Ensure inclusive and equitable quality education'),
                                                      (5, 'Achieve gender equality and empower all women and girls'),
                                                      (6, 'Ensure availability and sustainable management of water'),
                                                      (7, 'Ensure access to affordable, reliable, sustainable energy'),
                                                      (8, 'Promote sustained, inclusive and sustainable economic growth'),
                                                      (9, 'Build resilient infrastructure and promote innovation'),
                                                      (10, 'Reduce inequality within and among countries'),
                                                      (11, 'Make cities inclusive, safe, resilient and sustainable'),
                                                      (12, 'Ensure sustainable consumption and production patterns'),
                                                      (13, 'Take urgent action to combat climate change and its impacts'),
                                                      (14, 'Conserve and sustainably use oceans and marine resources'),
                                                      (15, 'Protect, restore and promote sustainable use of terrestrial ecosystems'),
                                                      (16, 'Promote peaceful and inclusive societies for sustainable development'),
                                                      (17, 'Strengthen the means of implementation and revitalize the global partnership');

-- Test Case 7: Public Service Types
INSERT INTO public_service_types (type_name, subtype_name) VALUES
-- Service to UP
('Service to UP', 'Dean/UP official with ALC of 9 u or more'),
('Service to UP', 'Director/College Secretary/UP official with ALC of 6 u'),
('Service to UP', 'Associate Dean with ALC of 6 units'),
('Service to UP', 'Program Coordinator/Assistant Secretary/Deputy Directors with ALC of 3 units'),
('Service to UP', 'Academic Leader/Lab. Head with ALC of 1 unit'),
('Service to UP', 'Chair in the unit’s standing Committees/Course Coordinators'),
('Service to UP', 'Membership in a standing committee of the Institute/Department/College/University (to be determined by the Dean or Institute Director/Department Chair) (3 pts./committee/year)'),

-- Other Service to UP
('Other Service to UP', 'Candidacy Exams'),
('Other Service to UP', 'Comprehensive Exams'),
('Other Service to UP', 'Qualifying Exams'),
('Other Service to UP', 'Placement Exams'),
('Other Service to UP', 'Program Advising'),

-- Service to Profession
('Service to Profession', 'Position of responsibility in an international/regional scientific organization'),
('Service to Profession', 'Position of responsibility in a national scientific organization'),
('Service to Profession', 'Editorial board member (main or topical) of SCIE - listed journal'),
('Service to Profession', 'Editorial board member (main or topical) of non-SCIE - listed journal'),
('Service to Profession', 'Editorial board member (main or topical) of SCIE - listed journal'),
('Service to Profession', 'Editorial board member (main or topical) of non-SCIE - listed/national journal'),
('Service to Profession', 'Referee in SCIE journal (5 points per Review)'),
('Service to Profession', 'Referee in non-SCIE journal'),
('Service to Profession', 'Other service to the Science community (please specify)'),

-- Service to Science Education
('Service to Science Education', 'Chair, international/regional Workshop/Training/Conference'),
('Service to Science Education', 'Member, international/regional Workshop/Training/Conference'),
('Service to Science Education', 'Chair, national Workshop/Training/Conference'),
('Service to Science Education', 'Member, national Workshop/Training/Conference'),
('Service to Science Education', 'Authorship of a scientific reference book/text book/manual (must submit ISBN)'),
('Service to Science Education', 'Author of popularized scientific article in international organization/media'),
('Service to Science Education', 'Author of popularized scientific article in national organization/media'),
('Service to Science Education', 'Resource person in print or broadcast media presentations'),
('Service to Science Education', 'Trainer within area of specialization (international/national)'),
('Service to Science Education', 'Resource person in symposia related to science education'),

-- Service to Nation
('Service to Nation', 'Member in international/regional scientific/technical committee'),
('Service to Nation', 'Member in national/university scientific/technical committee'),
('Service to Nation', 'Advisorship to international/regional scientific organization'),
('Service to Nation', 'Advisorship to national/university scientific organization'),
('Service to Nation', 'Active participation in international/regional outreach program'),
('Service to Nation', 'Active participation in national/university outreach program'),
('Service to Nation', 'Resource person in international/regional non-scientific meetings/symposium/extension activities'),
('Service to Nation', 'Resource person in national/university non-scientific meetings/symposium/extension activities');

-- Test Case 8: Create Approval Paths
-- Simulates Leo, our admin, creating two approval paths

INSERT INTO approval_paths (path_name)
VALUES ('CAS Faculty Path: Chair → Dean → VC → Chancellor');

-- path_id = 1
INSERT INTO approval_levels (path_id, level_order, role_rank_id, scope, deadline_days)
VALUES
    (1, 1, 6, 'department', 5),   -- Chair
    (1, 2, 4, 'college', 5),      -- Dean
    (1, 3, 3, 'university', 4),   -- VC
    (1, 4, 2, 'university', 3);   -- Chancellor

INSERT INTO approval_path_assignment (role_rank_id, department, college, path_id)
VALUES (8, 'DPSM', 'CAS', 1);  -- Faculty (CAS)

INSERT INTO approval_paths (path_name)
VALUES ('Chair Path: Dean → VC → Chancellor');

-- path_id = 2
INSERT INTO approval_levels (path_id, level_order, role_rank_id, scope, deadline_days)
VALUES
    (2, 1, 4, 'college', 5),      -- Dean
    (2, 2, 3, 'university', 4),   -- VC
    (2, 3, 2, 'university', 3);   -- Chancellor

INSERT INTO approval_path_assignment (role_rank_id, department, college, path_id)
VALUES (6, 'DPSM', 'CAS', 2);  -- Chairperson

INSERT INTO approval_paths (path_name)
VALUES ('Dean Path: VC → Chancellor');

-- path_id = 3
INSERT INTO approval_levels (path_id, level_order, role_rank_id, scope, deadline_days)
VALUES
    (3, 1, 3, 'university', 4),   -- VC
    (3, 2, 2, 'university', 3);   -- Chancellor

INSERT INTO approval_path_assignment (role_rank_id, college, path_id)
VALUES (4, 'CAS', 3);  -- Dean

INSERT INTO approval_paths (path_name)
VALUES ('Vice Chancy Path: Chancellor');

-- path_id = 4
INSERT INTO approval_levels (path_id, level_order, role_rank_id, scope, deadline_days)
VALUES
    (4, 1, 2, 'university', 3);   -- Chancellor

INSERT INTO approval_path_assignment (role_rank_id, path_id)
VALUES (3, 4);  -- VC

INSERT INTO approval_paths (path_name)
VALUES ('Chancy Path: OVCR');

-- path_id = 5
INSERT INTO approval_levels (path_id, level_order, role_rank_id, scope, deadline_days)
VALUES
    (5, 1, 1, 'university', 3);   -- OVCR

INSERT INTO approval_path_assignment (role_rank_id, path_id)
VALUES (2, 5);  -- Chancellor
-- Test Case 9: Create Activity Records
-- These are records for Juan Dela Cruz (user_id = 8)

INSERT INTO publications (
    user_id, publication_type_id, sdg_id, title, authors, date_published,
    journal, cited_as, doi, supporting_document, is_approved
) VALUES (
             8, 1, 3,
             'Machine Learning to Predict Public Health Trends',
             'Juan Dela Cruz, Maria Reyes',
             '2024-01-10',
             'UPM Public Health Informatics Journal',
             'Dela Cruz et al. (2024)',
             '10.5678/mlhealth.2024.001',
             '/docs/publications/ml_health_trends.pdf',
             FALSE
         );

-- Teaching activity header
INSERT INTO teaching_activities (
    user_id, type, description, academic_year, is_approved
) VALUES (
             8, 'Course',
             'Taught CMSC 128.1: Software Engineering I during AY 2023–2024',
             '2023–2024', FALSE
         );

-- Teaching details (assume teaching_id = 1)
INSERT INTO courses_and_sets (
    teaching_id, academic_year, term, course_number, section,
    course_description, course_type, teaching_points, supporting_document
) VALUES (
             1, '2023–2024', '1st Sem', 'CMSC 128.1', 'A',
             'Covers SRS, UML, testing, CI/CD, and project-based learning',
             'Lecture', 3.0, '/docs/teaching/cmsc1281_outline.pdf'
         );

INSERT INTO public_service (
    user_id, service_type_id, description, date_of_service, is_approved
) VALUES (
             8, 1,
             'Organized IT Literacy Training for Barangay 728 Youth',
             '2024-02-20', FALSE
         );








-- ACADEMIC AND PROFESSIONAL INFORMATION

CREATE TABLE educational_background (
                                        edu_id SERIAL PRIMARY KEY,
                                        user_id INT NOT NULL REFERENCES "user"(user_id),
                                        degree VARCHAR(255) NOT NULL,
                                        school VARCHAR(255) NOT NULL,
                                        graduation_year INT NOT NULL,
                                        degree_type VARCHAR(20) CHECK (degree_type IN ('Bachelor', 'Master', 'Doctoral')) NOT NULL
);

CREATE TABLE research_experience (
                                     research_experience_id SERIAL PRIMARY KEY,
                                     user_id INT NOT NULL REFERENCES "user"(user_id),
                                     location VARCHAR(255),
                                     start_date DATE,
                                     end_date DATE,
                                     experience_details TEXT
);

CREATE TABLE affiliations (
                              affiliation_id SERIAL PRIMARY KEY,
                              user_id INT NOT NULL REFERENCES "user"(user_id),
                              affiliation_name VARCHAR(255),
                              affiliation_type VARCHAR(100)
);

CREATE TABLE research_interests (
                                    research_interest_id SERIAL PRIMARY KEY,
                                    user_id INT NOT NULL REFERENCES "user"(user_id),
                                    research_interest TEXT
);









-- TEACHING AND AUTHORSHIP

CREATE TABLE teaching_activities (
                                     teaching_id SERIAL PRIMARY KEY,
                                     user_id INT NOT NULL REFERENCES "user"(user_id),
                                     type VARCHAR(100) CHECK (type IN ('Course', 'SET', 'Authorship')),
                                     description TEXT,
                                     academic_year VARCHAR(20),
                                     is_approved BOOLEAN DEFAULT FALSE
);

CREATE TABLE courses_and_sets (
                                  course_set_id SERIAL PRIMARY KEY,
                                  teaching_id INT REFERENCES teaching_activities(teaching_id),
                                  academic_year VARCHAR(20),
                                  term VARCHAR(20),
                                  course_number VARCHAR(20),
                                  section VARCHAR(20),
                                  course_description TEXT,
                                  course_type VARCHAR(50),
                                  teaching_points NUMERIC,
                                  supporting_document TEXT
);

CREATE TABLE authorship (
                            authorship_id SERIAL PRIMARY KEY,
                            teaching_id INT REFERENCES teaching_activities(teaching_id),
                            title TEXT,
                            authors TEXT,
                            date DATE,
                            up_course VARCHAR(100), -- Sample: CMSC 128.1
                            recommending_unit VARCHAR(100), -- Sample: DPSM
                            publisher TEXT,
                            authorship_type VARCHAR(100),
                            number_of_authors INT,
                            supporting_document TEXT
);





-- PUBLICATIONS

CREATE TABLE publication_types (
                                   publication_type_id SERIAL PRIMARY KEY,
                                   type_name VARCHAR(255),
                                   subtype_name VARCHAR(255)
);

CREATE TABLE sdg (
                     sdg_id SERIAL PRIMARY KEY,
                     sdg_name VARCHAR(255) NOT NULL
);

CREATE TABLE sdg_targets (
                             sdg_target_id SERIAL PRIMARY KEY,
                             sdg_id INT NOT NULL REFERENCES sdg(sdg_id) ON DELETE CASCADE,
                             sdg_target_name VARCHAR(255) NOT NULL
);

CREATE TABLE publications (
                              publication_id SERIAL PRIMARY KEY,
                              user_id INT REFERENCES "user"(user_id),
                              publication_type_id INT REFERENCES publication_types(publication_type_id),
                              sdg_id INT REFERENCES sdg(sdg_id),
                              title TEXT,
                              authors TEXT,
                              date_published DATE,
                              journal TEXT,
                              cited_as TEXT,
                              doi TEXT,
                              supporting_document TEXT,
                              is_approved BOOLEAN DEFAULT FALSE
);









-- PUBLIC SERVICE

CREATE TABLE public_service_types (
                                      service_type_id SERIAL PRIMARY KEY,
                                      type_name VARCHAR(255),
                                      subtype_name VARCHAR(255)
);

CREATE TABLE public_service (
                                service_id SERIAL PRIMARY KEY,
                                user_id INT REFERENCES "user"(user_id),
                                service_type_id INT REFERENCES public_service_types(service_type_id),
                                description TEXT,
                                date_of_service DATE,
                                is_approved BOOLEAN DEFAULT FALSE
);


























-- APPROVAL WORKFLOW
CREATE TABLE approval_paths (
                                path_id SERIAL PRIMARY KEY,
                                path_name TEXT NOT NULL
);

CREATE TABLE approval_levels (
                                 approval_level_id SERIAL PRIMARY KEY,
                                 path_id INT REFERENCES approval_paths(path_id),
                                 level_order INT NOT NULL,
                                 role_rank_id INT REFERENCES role_rank(role_rank_id),
                                 scope TEXT CHECK (scope IN ('department', 'college', 'university')),
                                 deadline_days INT
);

CREATE TABLE approval_path_assignment (
                                          assignment_id SERIAL PRIMARY KEY,
                                          role_rank_id INT REFERENCES role_rank(role_rank_id),
                                          college TEXT,
                                          department TEXT,
                                          path_id INT REFERENCES approval_paths(path_id)
);

CREATE TABLE submissions (
                             submission_id SERIAL PRIMARY KEY,
                             user_id INT REFERENCES "user"(user_id),
                             activity_type TEXT CHECK (activity_type IN ('publication', 'teaching', 'service')) NOT NULL,
                             reference_id INT NOT NULL,
                             submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                             current_version INT DEFAULT 1
);

CREATE TABLE approval_instances (
                                    approval_instance_id SERIAL PRIMARY KEY,
                                    submission_id INT REFERENCES submissions(submission_id),
                                    version INT NOT NULL,
                                    path_id INT REFERENCES approval_paths(path_id),
                                    current_level INT NOT NULL,
                                    status TEXT CHECK (status IN ('Pending', 'Approved', 'Rejected')) NOT NULL,
                                    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    manual_override BOOLEAN DEFAULT FALSE
);

CREATE TABLE approval_decisions (
                                    approval_decision_id SERIAL PRIMARY KEY,
                                    approval_instance_id INT REFERENCES approval_instances(approval_instance_id),
                                    level_order INT NOT NULL,
                                    approver_user_id INT REFERENCES "user"(user_id),
                                    decision TEXT CHECK (decision IN ('Approved', 'Rejected', 'Skipped')) NOT NULL,
                                    decision_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                                    remarks TEXT
);
