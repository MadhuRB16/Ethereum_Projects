# ethereum_projects
Vehicle History Tracker

Problem statement: it is very difficult for anyone to find the history of vehicle during purchase of used vehicle. We had to trust the third-party agent’s certificate on vehicle status.

Solution: A immutable record of vehicle history is recorded in blockchain via A DApp developed on a smart contract which stores the events of vehicle in its life cycle starting from registration of vehicle to repairs, services, Insurance associated with the vehicle.

A Simple front-end application enables to store below listed events in blockchain. This would be done by the vehicle owner,  Manufacturer, service centers, insurance companies.
•	Purchase/registration of new vehicle.
•	Services done
•	Repairs
•	Accidents
•	Insurance
•	Resell
During the purchase of used vehicle, user can fetch the details of the vehicle just by using the vehicle registered number to know the history to negotiate and quote the appropriate price.

Resell payments are done in ethers. and ownership of vehicle in contracts are changed accordingly.

The project is done TDD(Test Driven Development) using Truffle framework and Ganache simulator. The Solidity code is ran scanned through the static analysis tools like Securify and SmartCheck. DApp UI is build using a simple React based application.
