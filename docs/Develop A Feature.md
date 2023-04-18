# Develop A Feature

## Step 0

This step is irrelevant to this framework

It's rather like preconditions for developing a normal feature

1. Assess the design plan written by game designers
2. work through the feature, summary user operations and design data structure of messages with server developer
3. design data structures for both logic and presentation
4. wait for UI resources from artists or start with a rough panel and replace resources later

## Step 1 

Deal with network messages and game configs

1. Add the new network messages to [MsgDefine.ts](../TsProj/src/Define/MsgDefine.ts)

2. Add new config file(*.json) to [TsConfigs](../Assets/Resources/TsConfigs/)

   then generate TS files

   ![](imgs\develop_feature1.png)

## Step 2

Add a new type of item(also called Model) to store data of the feature

detailed info can be found in [Create An Item](Create%20An%20Item.md)

## Step 3

Create Panels for the feature

detailed info can be found in  [Create A Panel](Create%20A%20Panel.md)

## Step 4

Create Control for the feature

Control Layer is the bridge for View Layer(panels) and Model Layer(items)

A Controller does two main jobs:

1. Provide data to panels, keep complex logic in Controller Layer, keep View Layer and Model Layer as simple as possible
2. When an operation is triggered by user, such as login or clicking a button, validate the operation(check data model) and send message to server
3. When receive from server, alter model data and send notification to refresh panels via events or data binding

## Following Steps

Debug the logic and presentation with mock data(fake up server data)

Test with real server data and whole process

Refurbish the panels with resources provided by artists

Write a handbook for game designer who is to fill these configs

Process bugs from QA team and amendment from designers



