I chose Visual Code as my work environment. For this application I chose to work with functional components from React.

In the first phase, I fetched the data and displayed it to make sure I was able to retrieve it properly.

To get the data from the GraphQL API I used Apollo.

After making sure all the data looked correct, I started writing the JS code with which I got the number of posts for each month.

To build the chart I chose to use D3. After going through the necessary documentation, I started to build the actual chart.

I had a problem displaying the months on the Ox axis (when I displayed the months in numerical form, everything went well, but when I displayed them in the form of strings, the chart bars overlapped). To solve the problem I had to take a different approach from the original one. In the first phase I worked with an array of strings for Ox and an array of numbers for the number of posts on Oy.

Then, to improve the code, I chose to integrate all this data into an array of objects.

Finally I managed to finish displaying the chart. I tested it for both low values ​​(50-100 posts) and very high values ​​(over 5000 posts) and it worked properly.

In the code of this program I took 2000 GraphQL posts.
