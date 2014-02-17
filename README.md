# all your github are belong to us

GitHub is a fantastic tool &mdash; I use it constantly. I'd like to understand
more of how I work on GitHub, but I don't have all my data. I can setup an RSS
hook on my public feed, but I do a lot of work on private repos as well.

This webapp is a simple data collector: add it to repos in question and it'll log
everything you do on that repo into a MongoDB database. Each collection is named
after the event type. Pretty cool, huh?

## Installation

Simple, just run `script/bootstrap` from your clone.

You might need to create a token. Run `script/generator` and follow the
necessary prompts. Keep a record of this token &mdash; you'll need it for later
configuration. Hell, save it to a `.env` file, why don't ya?

## Deployment

I use Heroku because I'm obsessed with how easy it is to use. I also use `hk`
because Go is freaking awesome. [Download `hk`](https://hk.heroku.com/) then
run the following: 

```bash
$ hk create my-github-log-app-thingy
$ hk addon-add mongohq
$ hk set GITHUB_USERNAME=your-username
$ hk set GITHUB_TOKEN=abc123
$ hk set AYGABTU_URL=http://my-github-log-app-thingy.herokuapp.com
```

Then you'll have to tell your aggregator which events you care about. You can
view [all the events here](https://github.com/github/github-services/blob/3adc8da1485341316700b288c1dabc566e85fb96/lib/service.rb#L79).
Now, take the events you want and construct a JSON array. Then, set a string'd
version of that as your `GITHUB_HOOK_EVENTS`:

```bash
$ hk set GITHUB_HOOK_EVENTS='["push","pull_request"]' # just an example!
```

Then deploy your code:

```bash
$ git push heroku master
```

## Fetching data

It's all in Mongo. Now it's your job to get and understand it.

API endpoints are still in progress. Wanna help? Check out issue
[#2](https://github.com/parkr/all-your-github-are-belong-to-us/issues/2).
