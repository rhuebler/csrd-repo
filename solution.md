### General Idea

My overall idea was that it can be done with Rest API and a postgres DB. I am a bit usure about the structure of the data so my assumption here is that you can represent it with a json that is somewhat standardized. That the front end for the beginingg could be a queationaire that allows potential users to enter the data. There should also be ways to update and delete and review data.  A keyproblem seems to be limiting access and so a very granual permission system is necessary. As big companies with multiple branches could enter for one branch or for all and market competetiters might be using the same application. So it might be necessary for Rewe Germany and Rewe Jena use the application somewhat seperatly but hide data from Aldi. We probably need  some secure file storage. As there might be attachements-

Analysist should be able to review the data and score it. I guess the Report could be generated from all the analysed data.

The example code is for the create IRO endpoint. I optef for a local postgres database here. s

the System architecture diagram is a rough overview, obviously there are huge gaps in my knowledge of the problem and in reality I would probably spend more time researching it, but here I made a hard cut after 4hs of working on it where most of time went into tresearch. 

as you can see the diagram I am toying a bit with the idea of breaking off individual components into seperate apllicacions so that these could be deployed seperately, maybe with kubernetes...


### Opens Questions

do we need bulk upload, what is the expected load. how responsive do we need to be?

can IROs contain attachements? do they need to be updated? how do we store data securely, what is the data lefe cycle

How long does analysis typically take, can this be automated?

how long does analysis take? when we allow users to modify data, how will that affect Analysis do we need to lock data

how much traffic do we suspect?

can we share the database beween instances? do I need a way to evolve databse schemes

how do people gain access to the applicacion is there vetting process?

how do I decide internally who has access to which data, I need a structure to map users to data to I need to know which organization a user belongs to


### System Architecture diagrams
see IRO.drawio.html
PNG did not work
### Requirements
IRO
Provide a way to allow clients to upload IROs 
clients might upload multimple IROs so we need a way to map IROs to the client

save IROs in a database (postgres as JSON, or provide a structures)
 Users must be able to create an IRO entry for a sustainability topic.
 Each IRO must include Impact & Financial Materiality scores (severity, likelihood, time horizon).
IROs must be editable, reviewable, and have version history.

Topics

we likely need a way to have list of predefined topics to validate agains.


Stakeholder review
there should be a way to review IROs for stake holders

Login for client,(dashboard home screen for client)
(We need a way for clients to delete data) DSGVO prob says yes


Given the sensitivity of the data, data should be stored encrpyted

we probably need a very granular access system to data (More a permission group system, instead of a role based one)

### Assumptions

IROs can be represented as JSON and can be entered in the front end
We can provide a standard for the JSON to validate data
Clients can modify data
I can provide a list of acceptable topics and the user can fill them out
I can start with a MVP with limited functionality and grow from there:
    for example provide bulk upload or access to the rest endpoints later on
Assumptions it is acceptable to start with a more constrained represention of an IRO

Assumption attachements can be ignored for now we can provide "questionaire" in the frontend get some client interaction early and gain some experience with the data

### Trade offs
saving data in more structured way in the database means we can partially leverage the database for some analysis, but we would need more validations

keeping the format more open, allows us to create more real live data but will make analysis harder and harder to catch errors.

Postgres is open source and has a lot of examples available and is a good source for structured data, but we need a serpate databse for potential documents and we need to link it to postgres.

IROS Analysis/ should the analyis be a sperate entity that is linked to the IRO or should there be space in the IRO? Sperating those two things seems better. AS the IRO comes from the client, and I wanna limit write access to it and keeping it as a serpaerte entity reinforces that idea thrsough the code.


### Risks
how long does analysis take? when we allow users to modify data, how will that affect Analysis do we need to lock data

how do we ensure data integrety how do we make sure topics are "conforms"

If we allow stake holders to review IROs how do we present data, depending on the IRO data could be really sensitive and there is big risk of revealing important client data, must data be anomyniezed for review, 

have mutliple users access to the same data and can modify it the same time if so how do we deal with it

how do I authenticate stake holders, to prevent sensitive data to leak s


### Constraints

Data validity and Standard IROS should follow ERS standards
IROS have to be versioned , if allow for modification
Data retention, data has be stored probably for a certain amount of time

will analysis be a bottle neck

how many concurrent users do we expect and can the database keep up, 

how much data do we need to store there might be cost consraints.


### Exmaple Code

XYZ